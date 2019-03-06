import actions from '@/store/db/db.actions'
import { UserProductsDB } from '@/firebase/user-products-db'

const commit = jest.fn()

afterEach(() => {
  commit.mockReset()
})

describe('db module action', () => {
  describe('setUserProductDb', () => {
    it('should set user products database state correctly with the user id', async () => {
      const user = { id: 12 }
      await actions.initUserProductDb({ commit }, user)
      expect(commit).toHaveBeenCalledWith(
        'setUserProductDb',
        new UserProductsDB(user.id)
      )
    })
  })
  describe('resetUserProducts', () => {
    it('should set user products database state to null', async () => {
      await actions.resetUserProductDb({ commit })
      expect(commit).toHaveBeenCalledWith('setUserProductDb', null)
    })
  })
})
