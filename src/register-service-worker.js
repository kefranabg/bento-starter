import * as OfflinePluginRuntime from 'offline-plugin/runtime'

OfflinePluginRuntime.install({
  // When an update is ready, tell ServiceWorker to take control immediately:
  onUpdateReady() {
    OfflinePluginRuntime.applyUpdate()
  },

  // Service worker has been updated, ask user to reload page to get the last version
  onUpdated() {
    console.log('SW has been replaced, reload to get newer version')
  }
})
