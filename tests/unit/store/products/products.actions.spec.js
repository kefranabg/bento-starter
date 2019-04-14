import actions from '@/store/products/products.actions'

jest.mock('@/firebase/user-products-db', () => ({
  UserProductsDB: jest.mock()
}))

const mockUsersDbReadAll = jest.fn()
const mockUsersDbCreate = jest.fn()
const mockUsersDbDelete = jest.fn()
jest.mock('@/firebase/user-products-db', () =>
  jest.fn().mockImplementation(() => ({
    readAll: mockUsersDbReadAll,
    create: mockUsersDbCreate,
    delete: mockUsersDbDelete
  }))
)

const commit = jest.fn()
const dispatch = jest.fn()
const isProductDeletionPending = jest.fn()
const userId = 11
const user = { id: userId }
const product1 = { id: 1, name: 'product1' }
const product2 = { id: 2, name: 'product2' }
const rootState = {
  authentication: {
    user
  }
}
const getters = {
  isProductDeletionPending
}

afterEach(() => {
  commit.mockReset()
  dispatch.mockReset()
  mockUsersDbReadAll.mockReset()
  mockUsersDbCreate.mockReset()
  mockUsersDbDelete.mockReset()
  isProductDeletionPending.mockReset()
})

describe('products module action', () => {
  describe('getUserProducts', () => {
    it('should set products with ones owned by the current user', async () => {
      mockUsersDbReadAll.mockResolvedValue([product1, product2])
      await actions.getUserProducts({ commit, rootState })
      expect(commit).toHaveBeenCalledWith('setProducts', [product1, product2])
    })
  })

  describe('createUserProduct', () => {
    it('should set product creation as pending first', async () => {
      mockUsersDbCreate.mockResolvedValue(product2)
      await actions.createUserProduct({ commit, rootState })
      expect(commit).toHaveBeenNthCalledWith(
        1,
        'setProductCreationPending',
        true
      )
    })

    it('should add product', async () => {
      mockUsersDbCreate.mockResolvedValue(product2)
      await actions.createUserProduct({ commit, rootState }, product1)
      expect(commit).toHaveBeenNthCalledWith(2, 'addProduct', product2)
    })

    it('should set product creation as not pending after adding product', async () => {
      mockUsersDbCreate.mockResolvedValue(product2)
      await actions.createUserProduct({ commit, rootState }, product1)
      expect(commit).toHaveBeenNthCalledWith(
        3,
        'setProductCreationPending',
        false
      )
    })
  })

  describe('triggerAddProductAction', async () => {
    describe('when the name of the product is empty', () => {
      const state = {
        productNameToCreate: ''
      }

      it('should not set input name to empty', () => {
        actions.triggerAddProductAction({ dispatch, state, commit })
        expect(commit).not.toHaveBeenCalled()
      })

      it('should not dispatch create product action', () => {
        actions.triggerAddProductAction({ dispatch, state, commit })
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('when the name of the product is not empty', () => {
      const state = {
        productNameToCreate: 'todo'
      }

      it('should set input name to empty', () => {
        actions.triggerAddProductAction({ dispatch, state, commit })
        expect(commit).toHaveBeenCalledWith('setProductNameToCreate', '')
      })

      it('should dispatch create product action', () => {
        actions.triggerAddProductAction({ dispatch, state, commit })
        expect(dispatch).toHaveBeenCalledWith('createUserProduct', {
          name: 'todo'
        })
      })
    })
  })

  describe('deleteUserProduct', () => {
    describe('when the product is currently being deleted', () => {
      it('should not do anything', async () => {
        isProductDeletionPending.mockReturnValue(true)
        await actions.deleteUserProduct({ commit, rootState, getters }, 1)
        expect(commit).not.toHaveBeenCalled()
      })
    })

    describe('when the product is not currently being deleted', () => {
      it('should set product as deletion pending first', async () => {
        getters.isProductDeletionPending.mockReturnValue(false)
        await actions.deleteUserProduct({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(
          1,
          'addProductDeletionPending',
          1
        )
      })

      it('should remove product in store', async () => {
        await actions.deleteUserProduct({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(2, 'removeProductById', 1)
      })

      it('should remove product in db', async () => {
        await actions.deleteUserProduct({ commit, rootState, getters }, 1)
        expect(mockUsersDbDelete).toHaveBeenCalledWith(1)
      })

      it('should set product as not deletion pending after having removed the product', async () => {
        await actions.deleteUserProduct({ commit, rootState, getters }, 1)
        expect(commit).toHaveBeenNthCalledWith(
          3,
          'removeProductDeletionPending',
          1
        )
      })
    })
  })
})
