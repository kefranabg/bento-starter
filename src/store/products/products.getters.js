import { find } from 'lodash'

export default {
  /**
   * Check if a product has deletion pending
   */
  isProductDeletionPending: state => productId =>
    state.productDeletionPending.includes(productId),

  /**
   * Get a product by id
   */
  productById: state => productId => find(state.products, { id: productId })
}
