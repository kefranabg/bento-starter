export default {
  /**
   * Fetch products of current loggedin user
   */
  getUserProducts: async ({ rootState, commit }) => {
    const userProductDb = rootState.db.userProductDb

    const products = await userProductDb.readAll()
    commit('setProducts', products)
  },

  /**
   * Create a product for current loggedin user
   */
  createUserProduct: async ({ rootState, commit }, product) => {
    const userProductDb = rootState.db.userProductDb

    commit('setProductCreationPending', true)
    const createdProduct = await userProductDb.create(product)
    commit('addProduct', createdProduct)
    commit('setProductCreationPending', false)
  },

  /**
   * Create a new product current loggedin user and reset product name input
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

    const userProductsDb = rootState.db.userProductDb

    commit('addProductDeletionPending', productId)
    await userProductsDb.delete(productId)
    commit('removeProductById', productId)
    commit('removeProductDeletionPending', productId)
  }
}
