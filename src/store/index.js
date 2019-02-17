import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    authentication,
    app
  }
})
