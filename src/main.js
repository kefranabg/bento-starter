import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/handle-network-status'
import '@/firebase/init'

if (process.env.NODE_ENV === 'production') {
  import('./register-service-worker')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
