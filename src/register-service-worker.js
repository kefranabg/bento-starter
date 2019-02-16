import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import store from '@/store'

import { SET_NEW_CONTENT_AVAILABLE } from '@/store/app/app.mutations'

OfflinePluginRuntime.install({
  // When an update is ready, tell ServiceWorker to take control immediately:
  onUpdateReady() {
    OfflinePluginRuntime.applyUpdate()
  },

  // Service worker has been updated, ask user to reload page to get the last version
  onUpdated() {
    store.commit(`app/${SET_NEW_CONTENT_AVAILABLE}`, true)
  }
})
