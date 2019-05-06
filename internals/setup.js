#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

const readPkg = require('read-pkg')
const writePkg = require('write-pkg')
const shell = require('shelljs')
const { exec } = require('child_process')
const inquirer = require('inquirer')
const ora = require('ora')
const rimraf = require('rimraf')
const compareVersions = require('compare-versions')
const chalk = require('chalk')

const npmConfig = require('./helpers/get-npm-config')

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdout.write('\n')

/**
 * Deletes the current directory
 *
 * @returns {Promise<any>}
 */
function deleteCurrentDir() {
  return new Promise((resolve, reject) => {
    rimraf(__dirname, error => {
      if (error) {
        reject(new Error(error))
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
  const NEW_REPOSITORY = 'NEW_REPOSITORY'
  return inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Do you want to start with a new repository ?',
        name: NEW_REPOSITORY
      }
    ])
    .then(answers => !!answers[NEW_REPOSITORY])
}

/**
 * Ask user for new origin for this repository. If provided, call git remote add origin
 * @returns {Promise<any>}
 */
const askUserForNewRemote = () => {
  const NEW_REMOTE = 'NEW_REMOTE'

  return inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter new remote origin (ex: https://github.com/user/my-repo.git) for this repository [Enter to cancel]:  ',
        name: NEW_REMOTE
      }
    ])
    .then(answers => {
      const origin = answers[NEW_REMOTE]
      if (origin) {
        const spinner = ora('Adding new remote to repository')
        exec(`git remote add origin ${origin}`, error => {
          if (error) {
            spinner.fail('Add remote failed')
            return false
          } else {
            spinner.success(
              'New remote added, run `git push` to send initial commit to remote repository.'
            )
            return true
          }
        })
      } else {
        process.stdout.write(
          'No remote added, run git remote add origin <url> to add one'
        )
        return false
      }
    })
}

/**
 * Checks if we are under Git version control.
 * If we are and this a clone of our repository the user is given a choice to
 * either keep it or start with a new repository.
 * @returns {Promise<boolean>}
 */
async function cleanCurrentRepository() {
  const hasGitRepo = await hasGitRepository().catch(onError)

  // We are not under Git version control. So, do nothing
  if (hasGitRepo === false) {
    return false
  }

  const isClone = await checkIfRepositoryIsAClone().catch(onError)

  // Not our clone so do nothing
  if (isClone === false) {
    return false
  }

  const answer = await askUserIfWeShouldRemoveRepo()

  if (answer === true) {
    const spinner = ora('Removing current repository').start()
    await removeGitRepository().catch(reason => {
      spinner.fail(reason)
      onError()
    })
    spinner.succeed('Repository removed')
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
    const spinner = ora('Checking node version').start()

    exec('node --version', (err, stdout) => {
      const nodeVersion = stdout.trim()
      if (err) {
        spinner.fail(`node version check failed\n${err}`)
        reject()
      } else if (compareVersions(nodeVersion, minimalNodeVersion) === -1) {
        spinner.fail(
          `You need Node.js v${minimalNodeVersion} or above but you have v${nodeVersion}`
        )
        reject()
      }
      spinner.succeed(`Node version ${nodeVersion} OK`)
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
    const spinner = ora('Checking npm version').start()
    exec('npm --version', (err, stdout) => {
      const npmVersion = stdout.trim()
      if (err) {
        spinner.fail(`npm version check failed\n${err}`)
        reject()
      } else if (compareVersions(npmVersion, minimalNpmVersion) === -1) {
        spinner.fail(
          `You need NPM v${minimalNpmVersion} or above but you have v${npmVersion}`
        )
        reject()
      }
      spinner.succeed(`npm version ${npmVersion} OK`)
      resolve()
    })
  })
}

/**
 * Install all packages
 * @returns {Promise<any>}
 */
function installPackages() {
  return new Promise((resolve, reject) => {
    const spinner = ora(
      'Installing dependencies... (This might take a while)'
    ).start()

    exec('npm install', err => {
      if (err) {
        spinner.fail(`Packages installation failed\n${err}`)
        reject()
      }

      spinner.succeed('Packages installed')
      resolve()
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
    const spinner = ora('Creating initial commit for new repository').start()

    exec('git commit -m ":tada: Initial commit"', (err, stdout) => {
      if (err) {
        spinner.fail('Commit failed')
        reject(new Error(err))
      } else {
        spinner.succeed('Initial commit created')
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
    const spinner = ora('Uninstalling extraneous dependencies').start()
    exec(
      'npm uninstall rimraf compare-versions chalk shelljs read-pkg write-pkg inquirer ora --save-dev',
      err => {
        if (err) {
          spinner.fail(err)
          reject()
        } else {
          spinner.succeed('Extraneous dependencies uninstalled')
          resolve()
        }
      }
    )
  })
}

/**
 * Remove the "setup" script from package.json
 * @returns {Promise<any>}
 */
const removeSetupScript = () =>
  readPkg()
    .then(pkg => {
      if (!pkg.scripts) {
        pkg.scripts = {}
      }

      delete pkg.scripts.setup

      return pkg
    })
    .then(pkg => writePkg(pkg))

/**
 * End the setup process
 */
function endProcess() {
  process.stdout.write(chalk.blue('\n\nDone!\n'))
  process.exit(0)
}

function onError() {
  process.exit(1)
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
  await checkNodeVersion(requiredNodeVersion).catch(onError)

  const requiredNpmVersion = npm.match(/([0-9.]+)/g)[0]
  await checkNpmVersion(requiredNpmVersion).catch(onError)

  await installPackages().catch(onError)
  await deleteCurrentDir().catch(onError)
  await removeScriptDependencies().catch(onError)
  await removeSetupScript().catch(onError)

  if (repoRemoved) {
    process.stdout.write('\nInitialising new repository')

    try {
      await initGitRepository()
      await addToGitRepository()
      await commitToGitRepository()
      await askUserForNewRemote()
    } catch (err) {
      onError()
    }
  }

  endProcess()
})()
