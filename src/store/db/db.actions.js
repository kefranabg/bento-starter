import { UserProductsDB } from '@/firebase/user-products-db'

export default {
  initUserProductDb: async ({ commit }, user) => {
    commit('setUserProductDb', new UserProductsDB(user.id))
  },

  resetUserProductDb: async ({ commit }) => {
    commit('setUserProductDb', null)
  }
}
