const util = require('util')
const exec = util.promisify(require('child_process').exec)
const shell = require('shelljs')

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
 * Initialize a new Git repository
 * @returns {Promise<any>}
 */
async function initGitRepository() {
  return exec('git init')
}

/**
 * Make initial commit
 * @returns {Promise<any>}
 */
async function makeInitalCommit() {
  return exec('git add . && git commit -m ":tada: Initial commit"')
}

/**
 * Change the origin of the git repository
 * @param {String} origin
 */
async function changeOrigin(origin) {
  return exec(`git remote add origin ${origin}`)
}

module.exports = {
  initGitRepository,
  hasGitRepository,
  checkIfRepositoryIsAClone,
  removeGitRepository,
  makeInitalCommit,
  changeOrigin
}
