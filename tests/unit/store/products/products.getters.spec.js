import getters from '@/store/products/products.getters'

describe('products module getters', () => {
  describe('isProductDeletionPending', () => {
    it('should return true if the given product id is marked as pending', () => {
      const state = { productDeletionPending: [1, 2, 3] }
      const result = getters.isProductDeletionPending(state)(1)
      expect(result).toBe(true)
    })
    it('should return false if the given product id is not marked as pending', () => {
      const state = { productDeletionPending: [1, 2, 3] }
      const result = getters.isProductDeletionPending(state)(4)
      expect(result).toBe(false)
    })
  })
})
