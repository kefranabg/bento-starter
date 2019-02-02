module.exports = {
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
