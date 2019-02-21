import usersDb from '@/firebase/users-db'
import router from '@/router'
import { isNil } from 'lodash'

export default {
  /**
   * Callback fired when user login
   * @param {Object} firebase user
   */
  login: async ({ commit, dispatch }, firebaseUser) => {
    const user = await usersDb.read(firebaseUser.uid)

    isNil(user)
      ? await dispatch('createNewUser', firebaseUser)
      : commit('setUser', user)

    dispatch('products/getUserProducts', null, { root: true })
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    commit('setUser', null)
    commit('products/setProducts', null, { root: true })

    const currentRouter = router.app.$route
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login')
    }
  },

  /**
   * Create new user from firebase user infos
   */
  createNewUser: async ({ commit }, firebaseUser) => {
    const providerData = firebaseUser.providerData[0]
    const { displayName, photoURL, email } = providerData
    const user = {
      displayName,
      photoURL,
      email
    }

    const createdUser = await usersDb.create(user, firebaseUser.uid)
    commit('setUser', createdUser)
  }
}
