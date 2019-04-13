const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')
const RemoveDefaultManifestPlugin = require('./webpack-plugins/remove-default-manifest-plugin')

const prerenderedRoutesList = ['/login', '/home', '/']

module.exports = {
  /* See https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa for more details */
  pwa: {
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
      new RemoveDefaultManifestPlugin(),
      /* See https://github.com/chrisvfritz/prerender-spa-plugin for more details */
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__rootDirname),
        // Required - Routes to prerender.
        routes: prerenderedRoutesList
      })
    ]
  }
}
