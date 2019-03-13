const path = require('path')

module.exports = {
  pwa: {
    /* Example of dynamic caching : */
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.join('public', 'service-worker.js')
    }
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    }
  }
}
