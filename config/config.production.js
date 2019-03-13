const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = {
  css: {
    extract: {
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true
      }),
      /* See https://github.com/chrisvfritz/prerender-spa-plugin for more details */
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__rootDirname),
        // Required - Routes to prerender.
        routes: ['/login', '/home', '/']
      })
    ]
  }
}
