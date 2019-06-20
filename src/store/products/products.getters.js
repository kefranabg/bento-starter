import { find } from 'lodash'

export default {
  /**
   * Check if a product has deletion pending
   */
  isProductDeletionPending: state => productId =>
    state.productDeletionPending.includes(productId),

  /**
   * Get product by id
   */
  getProductById: state => productId =>
    find(state.products, product => product.id === productId)
}
