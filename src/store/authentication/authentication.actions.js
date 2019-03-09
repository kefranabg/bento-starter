import router from '@/router'
import { isNil } from 'lodash'

export default {
  /**
   * Callback fired when user login
   * @param {Object} firebase user
   */
  login: async ({ commit, dispatch, rootState }, firebaseUser) => {
    const userDb = rootState.db.userDb
    const user = await userDb.read(firebaseUser.uid)

    isNil(user)
      ? await dispatch('createNewUser', firebaseUser)
      : commit('setUser', user)

    dispatch('db/initUserProductDb', user, { root: true })
    dispatch('products/getUserProducts', null, { root: true })
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit, dispatch }) => {
    commit('setUser', null)
    commit('products/setProducts', null, { root: true })
    dispatch('db/resetUserProductDb', null, { root: true })

    const currentRouter = router.app.$route
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login')
    }
  },

  /**
   * Create new user from firebase user infos
   */
  createNewUser: async ({ commit, rootState }, firebaseUser) => {
    const providerData = firebaseUser.providerData[0]
    const { displayName, photoURL, email } = providerData
    const user = {
      displayName,
      photoURL,
      email
    }

    const userDb = rootState.db.userDb
    const createdUser = await userDb.create(user, firebaseUser.uid)
    commit('setUser', createdUser)
  }
}
