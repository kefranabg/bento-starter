import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import app from './app'
import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication,
    app,
    products
  }
})
