import store from '@/store'

import { SET_NETWORK_ONLINE } from '@/store/app/app.mutations'

store.commit(`app/${SET_NETWORK_ONLINE}`, navigator.onLine)

window.addEventListener('online', () =>
  store.commit(`app/${SET_NETWORK_ONLINE}`, true)
)

window.addEventListener('offline', () =>
  store.commit(`app/${SET_NETWORK_ONLINE}`, false)
)
