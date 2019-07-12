const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer') // eslint-disable-line
  .BundleAnalyzerPlugin
const PrerenderSPAPlugin = require('prerender-spa-plugin') // eslint-disable-line

const prerenderedRoutesList = ['/login', '/home', '/']

module.exports = {
  configureWebpack: {
    plugins: [
      /* Refer to https://www.npmjs.com/package/webpack-bundle-analyzer for more details */
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true
      }),
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
