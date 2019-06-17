const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const writeFile = util.promisify(require('fs').writeFile)
const path = require('path')
const changeCase = require('change-case')

const rootDirname = path.resolve(`${__dirname}/../../`)

const resourcesPathsToChangeNameIntoParamCase = [
  `${rootDirname}/package.json`,
  `${rootDirname}/package-lock.json`,
  `${rootDirname}/public/manifest.json`
]

const confPath = `${rootDirname}/.env.example`

const changeProjectNameWithParamCase = async newProjectName =>
  Promise.all(
    resourcesPathsToChangeNameIntoParamCase.map(async path => {
      const content = await readFile(path, 'utf-8')
      const newContent = content.replace(
        /bento-starter/,
        changeCase.paramCase(newProjectName)
      )
      return writeFile(path, newContent)
    })
  )

const changeProjectNameInConfFile = async newProjectName => {
  const content = await readFile(confPath, 'utf-8')
  const newContent = content.replace(/Bento Starter/, newProjectName)
  return writeFile(confPath, newContent)
}

module.exports = async newProjectName =>
  Promise.all([
    changeProjectNameWithParamCase(newProjectName),
    changeProjectNameInConfFile(newProjectName)
  ])
