// Declare root dirname globally
const path = require('path')
global.__rootDirname = path.join(__dirname, 'dist')

const fs = require('fs')
const merge = require('webpack-merge')
const defaultConfiguration = require('./config/config.default')
const environmentConfigurationPath = './config/config.' + process.env.NODE_ENV
const environmentConfiguration = fs.existsSync(environmentConfigurationPath)
  ? require(environmentConfigurationPath)
  : {}

const config = merge(defaultConfiguration, environmentConfiguration)

module.exports = config
