const util = require('util')
const exec = util.promisify(require('child_process').exec)
const shell = require('shelljs')
const rimraf = util.promisify(require('rimraf'))

/**
 * Checks if we are under Git version control
 * @returns {Promise<boolean>}
 */
async function hasGitRepository() {
  try {
    const result = await exec('git status')
    return !result.stderr
  } catch (err) {
    return false
  }
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
 * Checks if we are under Git version control and if this is a clone of our repository.
 * @returns {Promise<boolean>}
 */
async function checkIfRepositoryIsCleanable() {
  const hasGitRepo = await hasGitRepository()
  return hasGitRepo && (await checkIfRepositoryIsAClone())
}

/**
 * Remove the current Git repository
 * @returns {Promise<any>}
 */
async function removeGitRepository() {
  return rimraf('.git')
}

/**
 * Initialize a new Git repository
 * @returns {Promise<any>}
 */
async function initGitRepository() {
  return exec('git init')
}

/**
 * Do initial commit
 * @returns {Promise<any>}
 */
async function doInitalCommit() {
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
  checkIfRepositoryIsCleanable,
  removeGitRepository,
  doInitalCommit,
  changeOrigin
}
