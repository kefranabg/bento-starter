import { register } from 'register-service-worker'

import store from '@/store'

if (process.env.NODE_ENV === 'production') {
  register('/service-worker.js', {
    ready() {
      console.log('Service worker is active.')
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated(reg) {
      store.commit(`app/setSWRegistrationForNewContent`, reg)
      console.log('New content is available; please refresh.')
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
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
