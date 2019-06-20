const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)
const exec = util.promisify(require('child_process').exec)
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
  return writeFile(packageJsonPath, JSON.stringify(packageJson))
}

const processPackageLock = async newProjectName => {
  packageLock.name = changeCase.paramCase(newProjectName)
  return writeFile(packageLockPath, JSON.stringify(packageLock))
}

const processManifest = async (newProjectName, newProjectShortName) => {
  manifest.name = newProjectName
  manifest.short_name = newProjectShortName
  return writeFile(manifestPath, JSON.stringify(manifest))
}

const processConfig = async (newProjectName, newProjectShortName) => {
  const content = await readFile(confPath, 'utf-8')
  const newContent = content
    .replace(/Bento Starter/, newProjectName)
    .replace(/Bento/, newProjectShortName)
  return writeFile(confPath, newContent)
}

module.exports = async (newProjectName, newProjectShortName) => {
  await Promise.all([
    processPackageJson(newProjectName),
    processPackageLock(newProjectName),
    processManifest(newProjectName, newProjectShortName),
    processConfig(newProjectName, newProjectShortName)
  ])
  return exec('npm run prettier:format-all')
}
