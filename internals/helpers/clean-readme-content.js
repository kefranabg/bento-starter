const writeFile = util.promisify(require('fs').writeFile)

const newReadmeContent = `# My bento-starter project

## Documentation

Documentation available :point_right: [here](https://bento-starter.netlify.com/)`

/**
 * Replace README.md content
 *
 * @returns {Promise<any>}
 */
module.exports = async () => {
  return await writeFile(`${__dirname}/../README.md`, newReadmeContent)
}
