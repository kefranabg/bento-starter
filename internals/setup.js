#!/usr/bin/env node

const shell = require('shelljs')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const readline = require('readline')
const rimraf = require('rimraf')
const compareVersions = require('compare-versions')
const chalk = require('chalk')

const animateProgress = require('./helpers/progress')
const addCheckMark = require('./helpers/checkmark')
const addXMark = require('./helpers/xmark')
const npmConfig = require('./helpers/get-npm-config')

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdout.write('\n')
let interval = -1

/**
 * Deletes the current directory
 *
 * @returns {Promise<any>}
 */
function deleteCurrentDir() {
  return new Promise((resolve, reject) => {
    rimraf(__dirname, error => {
      if (error) {
        reject(new Error(err))
      } else {
        resolve()
      }
    })
  })
}

/**
 * Checks if we are under Git version control
 * @returns {Promise<boolean>}
 */
function hasGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git status', (err, stdout) => {
      if (err) {
        reject(new Error(err))
      }

      const regex = new RegExp(/fatal:\s+Not\s+a\s+git\s+repository/, 'i')

      /* eslint-disable-next-line no-unused-expressions */
      regex.test(stdout) ? resolve(false) : resolve(true)
    })
  })
}

/**
 * Checks if this is a clone from our repo
 * @returns {Promise<any>}
 */
function checkIfRepositoryIsAClone() {
  return new Promise((resolve, reject) => {
    exec('git remote -v', (err, stdout) => {
      if (err) {
        reject(new Error(err))
      }

      const isClonedRepo = stdout
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.startsWith('origin'))
        .filter(line => /kefranabg\/bento-starter\.git/.test(line)).length

      resolve(!!isClonedRepo)
    })
  })
}

/**
 * Remove the current Git repository
 * @returns {Promise<any>}
 */
function removeGitRepository() {
  return new Promise((resolve, reject) => {
    try {
      shell.rm('-rf', '.git/')
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * Ask user if he wants to start with a new repository
 * @returns {Promise<boolean>}
 */
function askUserIfWeShouldRemoveRepo() {
  return new Promise(resolve => {
    process.stdout.write('\nDo you want to start with a new repository? [Y/n] ')
    process.stdin.resume()
    process.stdin.on('data', pData => {
      const answer =
        pData
          .toString()
          .trim()
          .toLowerCase() || 'y'

      /* eslint-disable-next-line no-unused-expressions */
      answer === 'y' ? resolve(true) : resolve(false)
    })
  })
}

/**
 * Checks if we are under Git version control.
 * If we are and this a clone of our repository the user is given a choice to
 * either keep it or start with a new repository.
 * @returns {Promise<boolean>}
 */
async function cleanCurrentRepository() {
  const hasGitRepo = await hasGitRepository().catch(reason =>
    reportError(reason)
  )

  // We are not under Git version control. So, do nothing
  if (hasGitRepo === false) {
    return false
  }

  const isClone = await checkIfRepositoryIsAClone().catch(reason =>
    reportError(reason)
  )

  // Not our clone so do nothing
  if (isClone === false) {
    return false
  }

  const answer = await askUserIfWeShouldRemoveRepo()

  if (answer === true) {
    process.stdout.write('Removing current repository')
    await removeGitRepository().catch(reason => reportError(reason))
    addCheckMark()
  }

  return answer
}

/**
 * Check Node.js version
 * @param {!number} minimalNodeVersion
 * @returns {Promise<any>}
 */
function checkNodeVersion(minimalNodeVersion) {
  return new Promise((resolve, reject) => {
    exec('node --version', (err, stdout) => {
      const nodeVersion = stdout.trim()
      if (err) {
        reject(new Error(err))
      } else if (compareVersions(nodeVersion, minimalNodeVersion) === -1) {
        reject(
          new Error(
            `You need Node.js v${minimalNodeVersion} or above but you have v${nodeVersion}`
          )
        )
      }

      resolve('Node version OK')
    })
  })
}

/**
 * Check NPM version
 * @param {!number} minimalNpmVersion
 * @returns {Promise<any>}
 */
function checkNpmVersion(minimalNpmVersion) {
  return new Promise((resolve, reject) => {
    exec('npm --version', (err, stdout) => {
      const npmVersion = stdout.trim()
      if (err) {
        reject(new Error(err))
      } else if (compareVersions(npmVersion, minimalNpmVersion) === -1) {
        reject(
          new Error(
            `You need NPM v${minimalNpmVersion} or above but you have v${npmVersion}`
          )
        )
      }

      resolve('NPM version OK')
    })
  })
}

/**
 * Install all packages
 * @returns {Promise<any>}
 */
function installPackages() {
  return new Promise((resolve, reject) => {
    process.stdout.write(
      '\nInstalling dependencies... (This might take a while)'
    )

    setTimeout(() => {
      readline.cursorTo(process.stdout, 0)
      interval = animateProgress('Installing dependencies')
    }, 500)

    exec('npm install', err => {
      if (err) {
        reject(new Error(err))
      }

      clearInterval(interval)
      addCheckMark()
      resolve('Packages installed')
    })
  })
}

/**
 * Initialize a new Git repository
 * @returns {Promise<any>}
 */
function initGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git init', (err, stdout) => {
      if (err) {
        reject(new Error(err))
      } else {
        resolve(stdout)
      }
    })
  })
}

/**
 * Add all files to the new repository
 * @returns {Promise<any>}
 */
function addToGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git add .', (err, stdout) => {
      if (err) {
        reject(new Error(err))
      } else {
        resolve(stdout)
      }
    })
  })
}

/**
 * Initial Git commit
 * @returns {Promise<any>}
 */
function commitToGitRepository() {
  return new Promise((resolve, reject) => {
    exec('git commit -m ":tada: Initial commit"', (err, stdout) => {
      if (err) {
        reject(new Error(err))
      } else {
        resolve(stdout)
      }
    })
  })
}

/**
 * Remove npm dependencies which are only used by this script
 * @returns {Promise<any>}
 */
function removeScriptDependencies() {
  return new Promise((resolve, reject) => {
    exec(
      'npm uninstall rimraf compare-versions chalk shelljs --save-dev',
      (err, stdout) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(stdout)
        }
      }
    )
  })
}

/**
 * Report the the given error and exits the setup
 * @param {string} error
 */
function reportError(error) {
  clearInterval(interval)

  if (error) {
    process.stdout.write('\n\n')
    addXMark(() => process.stderr.write(chalk.red(` ${error}\n`)))
    process.exit(1)
  }
}

/**
 * End the setup process
 */
function endProcess() {
  clearInterval(interval)
  process.stdout.write(chalk.blue('\n\nDone!\n'))
  process.exit(0)
}

/**
 * Run
 */
;(async () => {
  const repoRemoved = await cleanCurrentRepository()

  // Take the required Node and NPM version from package.json
  const {
    engines: { node, npm }
  } = npmConfig

  const requiredNodeVersion = node.match(/([0-9.]+)/g)[0]
  await checkNodeVersion(requiredNodeVersion).catch(reason =>
    reportError(reason)
  )

  const requiredNpmVersion = npm.match(/([0-9.]+)/g)[0]
  await checkNpmVersion(requiredNpmVersion).catch(reason => reportError(reason))

  await installPackages().catch(reason => reportError(reason))
  await deleteCurrentDir().catch(reason => reportError(reason))
  await removeScriptDependencies().catch(reason => reportError(reason))

  if (repoRemoved) {
    process.stdout.write('\n')
    interval = animateProgress('Initialising new repository')
    process.stdout.write('Initialising new repository')

    try {
      await initGitRepository()
      await addToGitRepository()
      await commitToGitRepository()
    } catch (err) {
      reportError(err)
    }

    addCheckMark()
    clearInterval(interval)
  }

  endProcess()
})()
