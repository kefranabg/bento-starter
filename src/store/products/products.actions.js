import createUserProductsDb from '@/firebase/user-products-db'

export default {
  /**
   * Fetch products of current loggedin user
   */
  getUserProducts: async ({ rootState, commit }) => {
    const user = rootState.authentication.user
    const userProductsDb = createUserProductsDb(user.id)

    const products = await userProductsDb.readAll()
    commit('setProducts', products)
  },

  /**
   * Create a product for current loggedin user
   */
  createUserProduct: async ({ rootState, commit }, product) => {
    const user = rootState.authentication.user
    const userProductsDb = createUserProductsDb(user.id)

    commit('setProductCreationPending', true)
    const createdProduct = await userProductsDb.create(product)
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

    const user = rootState.authentication.user
    const userProductsDb = createUserProductsDb(user.id)

    commit('addProductDeletionPending', productId)
    await userProductsDb.delete(productId)
    commit('removeProductById', productId)
    commit('removeProductDeletionPending', productId)
  }
}
