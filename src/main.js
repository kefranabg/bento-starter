import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './handle-network-status'

OfflinePluginRuntime.install()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
