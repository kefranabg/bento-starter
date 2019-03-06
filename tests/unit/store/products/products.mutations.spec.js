import mutations from '@/store/products/products.mutations'

const product1 = { id: 1, name: 'product1' }
const product2 = { id: 2, name: 'product2' }
const getNewState = () => ({
  products: [product1, product2],
  productNameToCreate: '',
  productDeletionPending: [1],
  productCreationPending: false
})

describe('products module mutations', () => {
  describe('setProductNameToCreate', () => {
    it('should set product name to create correctly', () => {
      const state = getNewState()
      mutations.setProductNameToCreate(state, 'toto')
      expect(state).toEqual({
        ...getNewState(),
        productNameToCreate: 'toto'
      })
    })
  })
  describe('setProducts', () => {
    it('should set products correctly', () => {
      const state = { ...getNewState(), products: [] }
      mutations.setProducts(state, [product2, product1])
      expect(state).toEqual({
        ...getNewState(),
        products: [product2, product1]
      })
    })
  })
  describe('addProducts', () => {
    it('should add product correctly', () => {
      const state = { ...getNewState(), products: [] }
      mutations.addProduct(state, product1)
      expect(state).toEqual({
        ...getNewState(),
        products: [product1]
      })
    })
  })
  describe('removeProductById', () => {
    it('should remove product correctly', () => {
      const state = getNewState()
      mutations.removeProductById(state, 2)
      expect(state).toEqual({
        ...getNewState(),
        products: [product1]
      })
    })
  })
  describe('addProductDeletionPending', () => {
    it('should mark product as deletion correctly', () => {
      const state = getNewState()
      mutations.addProductDeletionPending(state, 2)
      expect(state).toEqual({
        ...getNewState(),
        productDeletionPending: [1, 2]
      })
    })
  })
  describe('removeProductDeletionPending', () => {
    it('should unmark product as deletion correctly', () => {
      const state = getNewState()
      mutations.removeProductDeletionPending(state, 1)
      expect(state).toEqual({
        ...getNewState(),
        productDeletionPending: []
      })
    })
  })
  describe('setProductCreationPending', () => {
    it('should set product creation pending correctly', () => {
      const state = getNewState()
      mutations.setProductCreationPending(state, true)
      expect(state).toEqual({
        ...getNewState(),
        productCreationPending: true
      })
    })
  })
})
