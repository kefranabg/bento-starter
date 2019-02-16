import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/views/Home'
import Login from '@/views/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    { path: '*', redirect: '/' }
  ]
})

/**
 * Redirect user to login page if auth user is not set
 */
router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired) &&
    !store.state.authentication.userInfos
  )
    return next({ path: '/login' })
  next()
})

export default router
