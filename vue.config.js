const PrerenderSPAPlugin = require('prerender-spa-plugin')
const OfflinePlugin = require('offline-plugin')
const path = require('path')

const config = {
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    plugins: [
      /* See https://github.com/chrisvfritz/prerender-spa-plugin for more details */
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to prerender.
        routes: ['/', '/about']
      })
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.configureWebpack.plugins = [
    ...config.configureWebpack.plugins,
    new OfflinePlugin()
  ]
}

module.exports = config
