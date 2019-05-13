#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

const readPkg = require('read-pkg')
const writePkg = require('write-pkg')
const shell = require('shelljs')
const inquirer = require('inquirer')
const ora = require('ora')
const rimraf = require('rimraf')
const compareVersions = require('compare-versions')
const chalk = require('chalk')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

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
async function hasGitRepository() {
  const { stdout } = await exec('git status')
  const regex = new RegExp(/fatal:\s+Not\s+a\s+git\s+repository/, 'i')
  return !regex.test(stdout)
}

/**
 * Checks if this is a clone from our repo
 * @returns {Promise<any>}
 */
async function checkIfRepositoryIsAClone() {
  const { stdout } = await exec('git remote -v')

  const isClonedRepo = stdout
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('origin'))
    .filter(line => /kefranabg\/bento-starter\.git/.test(line)).length

  return !!isClonedRepo
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
async function askUserIfWeShouldCreateNewRepo() {
  const NEW_REPOSITORY = 'NEW_REPOSITORY'
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      message: 'Do you want to start with a new repository ?',
      name: NEW_REPOSITORY
    }
  ])
  return !!answers[NEW_REPOSITORY]
}

/**
 * Ask user for new origin for this repository. If provided, call git remote add origin
 * @returns {Promise<any>}
 */
async function askUserForNewRemote() {
  const NEW_REMOTE = 'NEW_REMOTE'

  const answers = await inquirer.prompt([
    {
      type: 'input',
      message:
        'Enter new remote origin (ex: https://github.com/user/my-repo.git) for this repository [Enter to cancel]:  ',
      name: NEW_REMOTE
    }
  ])

  const origin = answers[NEW_REMOTE]

  if (origin) {
    const spinner = ora('Adding new remote to repository').start()
    try {
      await exec(`git remote add origin ${origin}`)
      spinner.succeed(
        'New remote added, run `git push` to send initial commit to remote repository.'
      )
      return true
    } catch (error) {
      spinner.fail(`Add remote failed\n${error}`)
      return false
    }
  } else {
    process.stdout.write(
      'No remote added, run git remote add origin <url> to add one'
    )
    return false
  }
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
    return await askUserIfWeShouldCreateNewRepo()
  }

  const isClone = await checkIfRepositoryIsAClone().catch(onError)

  // Not our clone so do nothing
  if (isClone === false) {
    return false
  }

  const answer = await askUserIfWeShouldCreateNewRepo()

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
async function checkNodeVersion(minimalNodeVersion) {
  const spinner = ora('Checking node version').start()

  let nodeVersion
  try {
    const { stdout } = await exec('node --version')
    nodeVersion = stdout.trim()
  } catch (err) {
    spinner.fail(`node version check failed\n${err}`)
    throw new Error(err)
  }

  if (compareVersions(nodeVersion, minimalNodeVersion) === -1) {
    spinner.fail(
      `You need Node.js v${minimalNodeVersion} or above but you have v${nodeVersion}`
    )
    throw new Error()
  }

  spinner.succeed(`Node version ${nodeVersion} OK`)
}

/**
 * Check NPM version
 * @param {!number} minimalNpmVersion
 * @returns {Promise<any>}
 */
async function checkNpmVersion(minimalNpmVersion) {
  const spinner = ora('Checking npm version').start()
  let npmVersion
  try {
    const { stdout } = await exec('npm --version')
    npmVersion = stdout.trim()
  } catch (err) {
    spinner.fail(`npm version check failed\n${err}`)
    throw new Error(err)
  }

  if (compareVersions(npmVersion, minimalNpmVersion) === -1) {
    spinner.fail(
      `You need NPM v${minimalNpmVersion} or above but you have v${npmVersion}`
    )
    throw new Error()
  }

  spinner.succeed(`npm version ${npmVersion} OK`)
}

/**
 * Initialize a new Git repository
 * @returns {Promise<any>}
 */
function initGitRepository() {
  return exec('git init')
}

/**
 * Add all files to the new repository
 * @returns {Promise<any>}
 */
function addToGitRepository() {
  return exec('git add .')
}

/**
 * Initial Git commit
 * @returns {Promise<any>}
 */
async function commitToGitRepository() {
  const spinner = ora('Creating initial commit for new repository').start()

  try {
    const { stdout } = await exec('git commit -m ":tada: Initial commit"')
    spinner.succeed('Initial commit created')
    return stdout
  } catch (err) {
    spinner.fail('Commit failed')
    throw new Error(err)
  }
}

/**
 * Remove npm dependencies which are only used by this script
 * @returns {Promise<any>}
 */
async function removeScriptDependencies() {
  const spinner = ora('Uninstalling extraneous dependencies').start()

  try {
    await exec(
      'npm uninstall rimraf compare-versions chalk shelljs read-pkg write-pkg inquirer ora --save-dev'
    )
    spinner.succeed('Extraneous dependencies uninstalled')
  } catch (err) {
    spinner.fail(err)
    throw new Error(err)
  }
}

/**
 * Remove the "setup" script from package.json
 * @returns {Promise<any>}
 */
async function removeSetupScript() {
  const pkg = await readPkg()

  if (!pkg.scripts) {
    pkg.scripts = {}
  }

  delete pkg.scripts.setup
  delete pkg.scripts.presetup

  return writePkg(pkg)
}

/**
 * End the setup process
 */
function endProcess() {
  process.stdout.write(chalk.blue('\n\nDone!\n'))
  process.exit(0)
}

function onError(e) {
  console.error('Exiting setup script with the following error\n', e)
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
