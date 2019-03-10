jest.mock('@/firebase/generic-db')
import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'
import { UsersDB } from '@/firebase/users-db'
import actions from '@/store/authentication/authentication.actions'
import router from '@/router'

jest.mock('@/misc/helpers', () => ({
  createNewUserFromFirebaseAuthUser: jest.fn()
}))

const commit = jest.fn()
const dispatch = jest.fn()
const userDb = new UsersDB()
const user = {
  displayName: 'Robert Bob',
  photoUrl: 'https://my-awesome-photo.com',
  email: 'robert.bob@mail.com'
}

const rootState = {
  db: {
    userDb
  }
}

afterEach(() => {
  commit.mockReset()
  dispatch.mockReset()
  userDb.read.mockReset()
  userDb.create.mockReset()
})

describe('authentication module action', () => {
  describe('login', () => {
    const firebaseUser = { providerData: [user] }

    afterEach(() => {
      userDb.read.mockReset()
    })

    it('should set user with existing user', async () => {
      userDb.read.mockResolvedValue(Promise.resolve(user))

      await actions.login(
        { commit, dispatch, rootState },
        {
          providerData: [user]
        }
      )

      expect(commit).toHaveBeenCalledWith('setUser', user)
    })

    it('should set user with a new created user', async () => {
      const newCreatedUser = { id: 1 }
      userDb.read.mockResolvedValue(Promise.resolve(undefined))
      createNewUserFromFirebaseAuthUser.mockImplementation(() =>
        Promise.resolve(newCreatedUser)
      )

      await actions.login({ commit, dispatch, rootState }, firebaseUser)

      expect(commit).toHaveBeenCalledWith('setUser', newCreatedUser)
    })

    it('should init userProductDb', async () => {
      userDb.read.mockResolvedValue(Promise.resolve(user))
      await actions.login(
        { commit, dispatch, rootState },
        {
          providerData: [user]
        }
      )

      expect(dispatch).toHaveBeenCalledWith('db/initUserProductDb', user, {
        root: true
      })
    })

    it('should get products for the user', async () => {
      userDb.read.mockResolvedValue(Promise.resolve(user))

      await actions.login(
        { commit, dispatch, rootState },
        {
          providerData: [user]
        }
      )

      expect(dispatch).toHaveBeenCalledWith('products/getUserProducts', null, {
        root: true
      })
    })
  })

  describe('logout', () => {
    const push = jest.spyOn(router, 'push').mockImplementation()
    beforeEach(() => {
      router.app = { $route: { meta: { authNotRequired: false } } }
    })
    afterEach(() => {
      push.mockClear()
    })
    it('should set the user to null', async () => {
      await actions.logout({ commit, dispatch })

      expect(commit).toHaveBeenCalledWith('setUser', null)
    })
    it('should set products to null', async () => {
      await actions.logout({ commit, dispatch })

      expect(commit).toHaveBeenCalledWith('products/setProducts', null, {
        root: true
      })
    })
    it('should push login view if the current route is not authorized', async () => {
      jest.spyOn(router, 'push')

      await actions.logout({ commit, dispatch })

      expect(push).toHaveBeenCalledWith('/login')
    })
    it('should reset userProductDb', async () => {
      await actions.logout({ commit, dispatch })

      expect(dispatch).toHaveBeenCalledWith('db/resetUserProductDb', null, {
        root: true
      })
    })
    it('should not push any page if the current page is authorized', async () => {
      router.app = { $route: { meta: { authNotRequired: true } } }
      jest.spyOn(router, 'push')

      await actions.logout({ commit, dispatch })

      expect(push).not.toHaveBeenCalled()
    })
  })
})
