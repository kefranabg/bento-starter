import usersDb from '@/firebase/users-db'
import router from '@/router'

export default {
  /**
   * Callback fired when user login
   * @param {Object} firebase user
   */
  login: async ({ commit, dispatch }, firebaseUser) => {
    const userInfos = await usersDb.read(firebaseUser.uid)

    userInfos
      ? commit('setUserInfos', userInfos)
      : await dispatch('createNewUserInfos', firebaseUser)
    router.push('/')
  },

  /**
   * Callback fire when user logout
   */
  logout: ({ commit }) => {
    router.push('/login')
    commit('setUserInfos', null)
  },

  createNewUserInfos: async ({ dispatch }, firebaseUser) => {
    const providerData = firebaseUser.providerData[0]
    const { displayName, photoURL, email } = providerData
    const userInfos = {
      displayName,
      photoURL,
      email
    }

    const createdUserInfos = await usersDb.create(userInfos, firebaseUser.uid)
    dispatch('setUserInfos', createdUserInfos)
  }
}
