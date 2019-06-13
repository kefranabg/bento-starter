const path = require('path')
const util = require('util')
const rimraf = util.promisify(require('rimraf'))

const rootDirname = path.resolve(`${__dirname}/../../`)

const resourcesPathsToDelete = [
  `${rootDirname}/internals`,
  `${rootDirname}/docs`,
  `${rootDirname}/.github`,
  `${rootDirname}/resources`,
  `${rootDirname}/.env.example`,
  `${rootDirname}/LICENSE`
]

/**
 * Delete useless resources
 * */
module.exports = async () =>
  await Promise.all(resourcesPathsToDelete.map(path => rimraf(path)))
