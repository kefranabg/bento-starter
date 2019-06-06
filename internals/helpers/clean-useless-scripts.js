const readPkg = require('read-pkg')
const writePkg = require('write-pkg')

/**
 * Remove the "setup" script from package.json
 * @returns {Promise<any>}
 */
module.exports = async () => {
  const pkg = await readPkg()

  if (!pkg.scripts) {
    pkg.scripts = {}
  }

  delete pkg.scripts.setup
  delete pkg.scripts.presetup

  return writePkg(pkg)
}
