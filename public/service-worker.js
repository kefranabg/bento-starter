workbox.core.setCacheNameDetails({ prefix: 'vue-firebase-starter-kit' })

workbox.skipWaiting()
workbox.clientsClaim()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html'),
  {
    blacklist: [new RegExp('authType=signInViaRedirect')]
  }
)

workbox.routing.registerRoute(
  /^https:\/\/fonts/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'fonts.googleapis',
    plugins: []
  }),
  'GET'
)
