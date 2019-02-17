import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/handle-network-status'
import '@/firebase/init'
import '@/register-service-worker'
import '@/show-prompt'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
