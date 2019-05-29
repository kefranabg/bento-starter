const copyFile = util.promisify(require('fs').copyFile)

/**
 * Create '.env.local' file by copying '.env.example' file
 *
 * @returns {Promise<any>}
 */
module.exports = async () => {
  return await copyFile(
    `${__dirname}/../../.env.example`,
    `${__dirname}/../../.env.local`
  )
}
