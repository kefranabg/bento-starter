const PrerenderSPAPlugin = require('prerender-spa-plugin')
const OfflinePlugin = require('offline-plugin')
const path = require('path')

const config = {
  css: {
    extract: {
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }
  },
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
        routes: ['/login']
      })
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.configureWebpack.plugins = [
    ...config.configureWebpack.plugins,
    new OfflinePlugin({
      ServiceWorker: {
        events: true
      }
    })
  ]
}

module.exports = config
