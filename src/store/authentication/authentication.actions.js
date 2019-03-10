import router from '@/router'
import { isNil } from 'lodash'
import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'

export default {
  /**
   * Callback fired when user login
   * @param {Object} firebase user
   */
  login: async ({ commit, dispatch, rootState }, firebaseAuthUser) => {
    const userDb = rootState.db.userDb
    const userFromFirebase = await userDb.read(firebaseAuthUser.uid)

    const user = isNil(userFromFirebase)
      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
      : userFromFirebase

    commit('setUser', user)
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
  }
}
