import mutations from '@/store/db/db.mutations'
import { UserProductsDB } from '@/firebase/user-products-db'
import { UsersDB } from '@/firebase/users-db'

describe('db module mutation', () => {
  describe('setUserProductDb', () => {
    it('should set the db to the given parameter', () => {
      const state = {
        userDb: new UsersDB(),
        userProductDb: null
      }
      mutations.setUserProductDb(state, new UserProductsDB(11))
      expect(state).toEqual({
        userDb: new UsersDB(),
        userProductDb: new UserProductsDB(11)
      })
    })
  })
})
