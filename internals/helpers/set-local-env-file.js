const util = require('util')
const copyFile = util.promisify(require('fs').copyFile)

/**
 * Create '.env.local' file by copying '.env.example' file
 *
 * @returns {Promise<any>}
 */
module.exports = async () =>
  await copyFile(
    `${__dirname}/../../.env.example`,
    `${__dirname}/../../.env.local`
  )
