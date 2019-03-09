const PrerenderSPAPlugin = require('prerender-spa-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')

let config = {
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
      // new PrerenderSPAPlugin({
      //   // Required - The path to the webpack-outputted app to prerender.
      //   staticDir: path.join(__dirname, 'dist'),
      //   // Required - Routes to prerender.
      //   routes: ['/login', '/home', '/']
      // })
    ]
  }
}

/**
 * Additional config for production
 */
if (process.env.NODE_ENV === 'production') {
  config.configureWebpack.plugins = [
    ...config.configureWebpack.plugins,
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    })
  ]
  config = {
    ...config,
    css: {
      extract: {
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css'
      }
    }
  }
}

module.exports = config
