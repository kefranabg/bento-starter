import UserProductsDB from '@/firebase/user-products-db'

export default {
  /**
   * Fetch products of current loggedin user
   */
  getUserProducts: async ({ rootState, commit }) => {
    const userProductDb = new UserProductsDB(rootState.authentication.user.id)

    const products = await userProductDb.readAll()
    commit('setProducts', products)
  },

  /**
   * Create a product for current loggedin user
   */
  createUserProduct: async ({ commit, rootState }, product) => {
    const userProductDb = new UserProductsDB(rootState.authentication.user.id)

    commit('setProductCreationPending', true)
    const createdProduct = await userProductDb.create(product)
    commit('addProduct', createdProduct)
    commit('setProductCreationPending', false)
  },

  /**
   * Create a new product for current loggedin user and reset product name input
   */
  triggerAddProductAction: ({ dispatch, state, commit }) => {
    if (state.productNameToCreate === '') return

    const product = { name: state.productNameToCreate }
    commit('setProductNameToCreate', '')
    dispatch('createUserProduct', product)
  },

  /**
   * Delete a user product from its id
   */
  deleteUserProduct: async ({ rootState, commit, getters }, productId) => {
    if (getters.isProductDeletionPending(productId)) return

    const userProductsDb = new UserProductsDB(rootState.authentication.user.id)

    commit('addProductDeletionPending', productId)
    await userProductsDb.delete(productId)
    commit('removeProductById', productId)
    commit('removeProductDeletionPending', productId)
  }
}
