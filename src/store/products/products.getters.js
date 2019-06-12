export default {
  /**
   * Check if products are loaded
   */
  areProductsLoaded: state => state.products && state.products.length !== 0,

  /**
   * Check if a product has deletion pending
   */
  isProductDeletionPending: state => productId =>
    state.productDeletionPending.includes(productId),

  /**
   * Get product by id
   */
  getProductById: state => productId =>
    state.products.find(product => product.id === productId)
}
