import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/check-login',
      name: 'check-login',
      component: CheckLogin,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () =>
        import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () =>
        import(/* webpackChunkName: "dashboard" */ '@/views/Account.vue')
    },
    { path: '*', redirect: '/' }
  ]
})

export default router
