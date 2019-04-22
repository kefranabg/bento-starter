// Declare root dirname globally
const path = require('path')

global.__rootDirname = path.join(__dirname, 'dist')

const fs = require('fs')
const merge = require('webpack-merge')
const defaultConfiguration = require('./vue-config/config.default')

const environmentConfigurationPath =
  './vue-config/config.' + process.env.NODE_ENV + '.js'

const environmentConfiguration = fs.existsSync(environmentConfigurationPath)
  ? require(environmentConfigurationPath) // eslint-disable-line
  : {}

const config = merge(defaultConfiguration, environmentConfiguration)

module.exports = config
