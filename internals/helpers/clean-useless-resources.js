const util = require('util')
const rimraf = util.promisify(require('rimraf'))

const resourcesPathsToDelete = [
  `${__dirname}/../`,
  `${__dirname}/../../docs`,
  `${__dirname}/../../.github`,
  `${__dirname}/../../resources`,
  `${__dirname}/../../.env.example`,
  `${__dirname}/../../LICENSE`
]

/**
 * Delete useless resources
 * */
module.exports = async () => {
  return await Promise.all(resourcesPathsToDelete.map(path => rimraf(path)))
}
