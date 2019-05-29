#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

const inquirer = require('inquirer')
const ora = require('ora')
const compareVersions = require('compare-versions')
const chalk = require('chalk')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const npmConfig = require('./helpers/get-npm-config')
const cleanUselessScripts = require('./helpers/clean-useless-scripts')
const cleanUselessResources = require('./helpers/clean-useless-resources')
const cleanUselessDependencies = require('./helpers/clean-useless-dependencies')
const cleanReadmeContent = require('./helpers/clean-readme-content')
const setLocalEnvFile = require('./helpers/set-local-env-file')
const gitHelper = require('./helpers/git-helper')

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdout.write('\n')

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
      await gitHelper.changeOrigin(origin)
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

async function doCommand(command, commandLog, successLog, failLog) {
  const spinner = ora(commandLog).start()
  try {
    await command()
    spinner.succeed(successLog)
  } catch (err) {
    spinner.fail(failLog)
    throw new Error(err)
  }
}

/**
 * End the setup process
 */
function endProcess() {
  process.stdout.write(chalk.blue('\n\nDone!\n'))
  process.exit(0)
}

/**
 * End the setup process with an error
 */
function onError(e) {
  console.error('Exiting setup script with the following error\n', e)
  process.exit(1)
}

/**
 * Run
 */
;(async () => {
  let isNewRepositoryWanted
  if (await gitHelper.checkIfRepositoryIsCleanable()) {
    isNewRepositoryWanted = await askUserIfWeShouldCreateNewRepo()
  }

  // Take the required Node and NPM version from package.json
  const {
    engines: { node, npm }
  } = npmConfig

  const requiredNodeVersion = node.match(/([0-9.]+)/g)[0]
  await checkNodeVersion(requiredNodeVersion).catch(onError)

  const requiredNpmVersion = npm.match(/([0-9.]+)/g)[0]
  await checkNpmVersion(requiredNpmVersion).catch(onError)

  await createEnvLocalFile().catch(onError)

  await doCommand(
    setLocalEnvFile,
    'Creating env local file',
    'Created env local file',
    'Create env local file failed'
    ).catch(onError)

  await doCommand(
    cleanUselessDependencies,
    'Uninstalling extraneous dependencies',
    'Extraneous dependencies uninstalled',
    'Failed to uninstall useless externeous dependencies'
    ).catch(onError)

  await doCommand(
    cleanUselessScripts,
    'Cleaning useless scripts in package.json',
    'Scripts in plackage.json cleaned',
    'Failed to remove useless package.json scripts'
    ).catch(onError)

  await doCommand(
    cleanReadmeContent,
    'Replacing README.md content',
    'README.md content replaced',
    'Replace README.md content failed'
    ).catch(onError)

  await doCommand(
    cleanUselessResources,
    'Removing useless resources',
    'Useless resources have been deleted'
    'Remove useless resources failed'
    ).catch(onError)

  if (newRepositoryWanted) {
    process.stdout.write('\nInitialising new repository')

    try {
      await doCommand(
        removeRepository, 
        'Removing current repository', 
        'Repository removed', 
        'Initial commit failed'
        ).catch(onError)

      await doCommand(
        initGitRepository, 
        'Creating new repository', 
        'New repository created', 
        'Creation of new repository failed'
        ).catch(onError)

      await doCommand(
        doInitalCommit, 
        'Creating initial commit for new repository', 
        'Initial commit created', 
        'Initial commit failed'
        ).catch(onError)

      await askUserForNewRemote()
    } catch (err) {
      onError()
    }
  }

  endProcess()
})()
