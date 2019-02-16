import usersDb from '@/firebase/users-db'
import router from '@/router'

export default {
  /**
   * Callback fired when user login
   * @param {Object} firebase user
   */
  login: async ({ commit, dispatch }, firebaseUser) => {
    const user = await usersDb.read(firebaseUser.uid)

    user
      ? commit('setUser', user)
      : await dispatch('createNewUser', firebaseUser)
    router.push('/')
  },

  /**
   * Callback fire when user logout
   */
  logout: ({ commit }) => {
    router.push('/login')
    commit('setUser', null)
  },

  /**
   * Create new user from firebase user infos
   */
  createNewUser: async ({ dispatch }, firebaseUser) => {
    const providerData = firebaseUser.providerData[0]
    const { displayName, photoURL, email } = providerData
    const user = {
      displayName,
      photoURL,
      email
    }

    const createdUser = await usersDb.create(user, firebaseUser.uid)
    dispatch('setUser', createdUser)
  }
}
