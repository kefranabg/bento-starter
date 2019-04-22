import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import app from './app'
import products from './products'

Vue.use(Vuex)

/* If you don't know about Vuex, please refer to https://vuex.vuejs.org/ */

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication,
    app,
    products
  }
})
