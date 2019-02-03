const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = {
  configureWebpack: {
    plugins: [
      /* See https://github.com/chrisvfritz/prerender-spa-plugin for more details */
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: ['/', '/about']
      })
    ]
  },
  pwa: {
    workboxOptions: {
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        /*
          Here you can add runtime caching
          See https://developers.google.com/web/tools/workbox/ for more details
         */
      ]
    }
  }
}
