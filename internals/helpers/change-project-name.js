const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)
const path = require('path')
const changeCase = require('change-case')

const packageJson = require('../../package.json')
const packageLock = require('../../package-lock.json')
const manifest = require('../../public/manifest.json')

const rootDirname = path.resolve(`${__dirname}/../../`)

const confPath = `${rootDirname}/.env.example`
const packageJsonPath = `${rootDirname}/package.json`
const packageLockPath = `${rootDirname}/package-lock.json`
const manifestPath = `${rootDirname}/public/manifest.json`

const processPackageJson = async newProjectName => {
  packageJson.name = changeCase.paramCase(newProjectName)
  return writeFile(path, JSON.stringify(packageJsonPath))
}

const processPackageLock = async newProjectName => {
  packageLock.name = changeCase.paramCase(newProjectName)
  return writeFile(path, JSON.stringify(packageLockPath))
}

const processManifest = async (newProjectName, newProjectShortName) => {
  manifest.name = newProjectName
  manifest.short_name = newProjectShortName
  return writeFile(path, JSON.stringify(manifestPath))
}

const processConfig = async newProjectName => {
  const content = await readFile(confPath, 'utf-8')
  const newContent = content.replace(/Bento Starter/, newProjectName)
  return writeFile(confPath, newContent)
}

module.exports = async (newProjectName, newProjectShortName) =>
  Promise.all([
    processPackageJson(newProjectName),
    processPackageLock(newProjectName),
    processManifest(newProjectName, newProjectShortName),
    processConfig(newProjectName)
  ])
