import mutations from '@/store/products/products.mutations'
import { cloneDeep } from 'lodash'

const product1 = { id: 1, name: 'product1' }
const product2 = { id: 2, name: 'product2' }
const baseState = {
  products: [product1, product2],
  productNameToCreate: '',
  productDeletionPending: [1],
  productCreationPending: false
}

describe('products module mutations', () => {
  describe('setProductNameToCreate', () => {
    it('should set product name to create correctly', () => {
      const state = cloneDeep(baseState)
      mutations.setProductNameToCreate(state, 'toto')
      expect(state).toEqual({
        ...baseState,
        productNameToCreate: 'toto'
      })
    })
  })

  describe('setProducts', () => {
    it('should set products correctly', () => {
      const state = { ...cloneDeep(baseState), products: [] }
      mutations.setProducts(state, [product2, product1])
      expect(state).toEqual({
        ...baseState,
        products: [product2, product1]
      })
    })
  })

  describe('addProducts', () => {
    it('should add product correctly', () => {
      const state = { ...cloneDeep(baseState), products: [] }
      mutations.addProduct(state, product1)
      expect(state).toEqual({
        ...baseState,
        products: [product1]
      })
    })
  })

  describe('removeProductById', () => {
    it('should remove product correctly', () => {
      const state = cloneDeep(baseState)
      mutations.removeProductById(state, 2)
      expect(state).toEqual({
        ...baseState,
        products: [product1]
      })
    })
  })

  describe('addProductDeletionPending', () => {
    it('should mark product as deletion correctly', () => {
      const state = cloneDeep(baseState)
      mutations.addProductDeletionPending(state, 2)
      expect(state).toEqual({
        ...baseState,
        productDeletionPending: [1, 2]
      })
    })
  })

  describe('removeProductDeletionPending', () => {
    it('should unmark product as deletion correctly', () => {
      const state = cloneDeep(baseState)
      mutations.removeProductDeletionPending(state, 1)
      expect(state).toEqual({
        ...baseState,
        productDeletionPending: []
      })
    })
  })

  describe('setProductCreationPending', () => {
    it('should set product creation pending correctly', () => {
      const state = cloneDeep(baseState)
      mutations.setProductCreationPending(state, true)
      expect(state).toEqual({
        ...baseState,
        productCreationPending: true
      })
    })
  })
})
