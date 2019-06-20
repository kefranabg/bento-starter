#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

const inquirer = require('inquirer')
const ora = require('ora')
const compareVersions = require('compare-versions')
const chalk = require('chalk')
const boxen = require('boxen')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const npmConfig = require('./helpers/get-npm-config')
const cleanUselessScripts = require('./helpers/clean-useless-scripts')
const cleanUselessResources = require('./helpers/clean-useless-resources')
const cleanUselessDependencies = require('./helpers/clean-useless-dependencies')
const cleanReadmeContent = require('./helpers/clean-readme-content')
const setLocalEnvFile = require('./helpers/set-local-env-file')
const changeProjectName = require('./helpers/change-project-name')
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
      spinner.succeed(`New remote added ${printOk()}`)
      return true
    } catch (error) {
      spinner.fail(`Add remote failed ${printFail()}`)
      return false
    }
  }
  return false
}

/**
 * Ask user for new project name. If provided, change project name
 * @returns {Promise<any>}
 */
async function askUserForNewProjectName() {
  const NEW_PROJECT_NAME = 'NEW_PROJECT_NAME'
  const NEW_PROJECT_SHORT_NAME = 'NEW_PROJECT_SHORT_NAME'

  const answers = await inquirer.prompt([
    {
      type: 'input',
      message:
        'Enter new project name (ex: Bento Starter) [Use empty value to skip]:',
      name: NEW_PROJECT_NAME
    },
    {
      type: 'input',
      message:
        'Enter new project short name (used for mobile) [max 12 characters] :',
      name: NEW_PROJECT_SHORT_NAME,
      when: answers => answers[NEW_PROJECT_NAME],
      default: answers =>
        answers[NEW_PROJECT_NAME].length <= 12
          ? answers[NEW_PROJECT_NAME]
          : undefined,
      validate: input =>
        input && input.length <= 12
          ? true
          : 'Your project short name must have a maximum of 12 characters'
    }
  ])

  return {
    projectName: answers[NEW_PROJECT_NAME],
    projectShortName: answers[NEW_PROJECT_SHORT_NAME]
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

  spinner.succeed(`Node version ${nodeVersion} ${printOk()}`)
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

  spinner.succeed(`npm version ${npmVersion} ${printOk()}`)
}

async function doCommand(command, commandLog, ...args) {
  const spinner = ora(commandLog).start()
  try {
    await command(...args)
    spinner.succeed(`${commandLog} ${printOk()}`)
  } catch (err) {
    spinner.fail(`${commandLog} ${printFail()}`)
    throw new Error(err)
  }
}

/**
 * End the setup process
 */
function endProcess() {
  process.stdout.write(
    boxen(
      `
Thank you for using bento-starter !

Do not hesitate to share your project with 
the community on slack : 

https://tinyurl.com/yxzrc7fq

You can also contact us on twitter
${chalk.blue('@FranckAbgrall')} or ${chalk.blue('@tbetous')}.

We hope to hear about your project soon !
`,
      {
        padding: 1,
        margin: { top: 3, bottom: 3 },
        borderColor: 'cyan',
        align: 'center',
        borderStyle: 'double'
      }
    )
  )
  process.exit(0)
}

/**
 * End the setup process with an error
 */
function onError(e) {
  console.error('\n\nExiting setup script with the following error :\n', e)
  process.exit(1)
}

function printOk() {
  return chalk.green('[OK]')
}

function printFail() {
  return chalk.green('[FAIL]')
}

/**
 * Run
 */
;(async () => {
  let isNewOrigin
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

  const { projectName, projectShortName } = await askUserForNewProjectName()
  if (projectName) {
    await doCommand(
      changeProjectName,
      'Changing project name',
      projectName,
      projectShortName
    ).catch(onError)
  }

  await doCommand(setLocalEnvFile, 'Creating env local file').catch(onError)

  await doCommand(
    cleanUselessDependencies,
    'Cleaning extraneous dependencies'
  ).catch(onError)

  await doCommand(
    cleanUselessScripts,
    'Cleaning useless scripts in package.json'
  ).catch(onError)

  await doCommand(cleanReadmeContent, 'Cleaning README.md content').catch(
    onError
  )

  await doCommand(cleanUselessResources, 'Cleaning useless resources').catch(
    onError
  )

  if (isNewRepositoryWanted) {
    await doCommand(
      gitHelper.removeGitRepository,
      'Removing current repository'
    ).catch(onError)

    await doCommand(
      gitHelper.initGitRepository,
      'Creating new repository'
    ).catch(onError)

    await doCommand(
      gitHelper.doInitalCommit,
      'Creating initial commit for new repository'
    ).catch(onError)

    isNewOrigin = await askUserForNewRemote()
  }

  if (isNewRepositoryWanted && isNewOrigin) {
    process.stdout.write('\n')
    process.stdout.write(
      chalk.blue(
        'ℹ Run `git push` to send initial commit to remote repository.'
      )
    )
  } else if (isNewRepositoryWanted && !isNewOrigin) {
    process.stdout.write('\n')
    process.stdout.write(
      chalk.blue(
        'ℹ No remote added, run `git remote add origin <url>` to add one.'
      )
    )
  } else {
    process.stdout.write('\n')
    process.stdout.write(
      chalk.blue(
        'ℹ No remote changed, run `git remote set-url origin <url>` to change it.'
      )
    )
  }

  endProcess()
})()
