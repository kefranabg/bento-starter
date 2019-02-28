import productActions from '@/store/products/products.actions'
import createUserProductsDb from '@/firebase/user-products-db'

jest.mock('@/firebase/user-products-db', () => jest.fn())

describe('Store products', () => {
  describe('createUserProduct', () => {
    it('should create a product', async () => {
      const params = {
        commit: jest.fn(),
        rootState: { authentication: { user: { id: '1' } } }
      }

      const createdProd = { id: '1', name: '2' }
      createUserProductsDb.mockImplementation(() => ({
        create: () => Promise.resolve({ id: '1', name: '2' })
      }))
      await productActions.createUserProduct(params, createdProd)

      expect(params.commit.mock.calls).toEqual([
        ['setProductCreationPending', true],
        ['addProduct', createdProd],
        ['setProductCreationPending', false]
      ])
    })
  })
})
