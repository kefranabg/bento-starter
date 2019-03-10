const PrerenderSPAPlugin = require('prerender-spa-plugin')
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
    },
    plugins: [
      /* See https://github.com/chrisvfritz/prerender-spa-plugin for more details */
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__rootDirname, 'dist'),
        // Required - Routes to prerender.
        routes: ['/login', '/home', '/']
      })
    ]
  }
}
