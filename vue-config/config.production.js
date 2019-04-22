const BundleAnalyzerPlugin = require('webpack-bundle-analyzer') // eslint-disable-line
  .BundleAnalyzerPlugin

module.exports = {
  css: {
    extract: {
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }
  },
  configureWebpack: {
    plugins: [
      /* Refer to https://www.npmjs.com/package/webpack-bundle-analyzer for more details */
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true
      })
    ]
  }
}
