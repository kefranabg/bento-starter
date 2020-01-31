import { register } from 'register-service-worker'

import store from '@/store'

if (process.env.NODE_ENV === 'production') {
  register('/service-worker.js', {
    ready() {
      // eslint-disable-next-line no-console
      console.info('Service worker is active.')
    },
    registered() {
      // eslint-disable-next-line no-console
      console.info('Service worker has been registered.')
    },
    cached() {
      // eslint-disable-next-line no-console
      console.info('Content has been cached for offline use.')
    },
    updatefound() {
      // eslint-disable-next-line no-console
      console.info('New content is downloading.')
    },
    updated(reg) {
      // eslint-disable-next-line no-console
      console.info('New content is available; please refresh.')
      store.commit(`app/setSWRegistrationForNewContent`, reg)
    },
    offline() {
      // eslint-disable-next-line no-console
      console.info(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      // eslint-disable-next-line no-console
      console.error('Error during service worker registration:', error)
    }
  })
}

if ('serviceWorker' in navigator) {
  let refreshing = false
  // This is triggered when a new service worker take over
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    refreshing = true

    window.location.reload()
  })
}
