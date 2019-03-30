import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'
import actions from '@/store/authentication/authentication.actions'
import router from '@/router'

const mockUsersDbRead = jest.fn()
jest.mock('@/firebase/users-db', () =>
  jest.fn().mockImplementation(() => ({ read: mockUsersDbRead }))
)
jest.mock('@/misc/helpers', () => ({
  createNewUserFromFirebaseAuthUser: jest.fn()
}))

const commit = jest.fn()
const dispatch = jest.fn()
const user = {
  displayName: 'Robert Bob',
  photoUrl: 'https://my-awesome-photo.com',
  email: 'robert.bob@mail.com'
}

afterEach(() => {
  commit.mockReset()
  dispatch.mockReset()
  mockUsersDbRead.mockReset()
  createNewUserFromFirebaseAuthUser.mockReset()
})

describe('authentication module action', () => {
  describe('login', () => {
    const firebaseUser = { providerData: [user] }

    it('should set user with existing user', async () => {
      mockUsersDbRead.mockResolvedValue(Promise.resolve(user))
      await actions.login({ commit, dispatch }, firebaseUser)

      expect(commit).toHaveBeenCalledWith('setUser', user)
    })

    it('should set user with a new created user', async () => {
      const newCreatedUser = { id: 1 }
      mockUsersDbRead.mockResolvedValue(Promise.resolve(undefined))
      createNewUserFromFirebaseAuthUser.mockImplementation(() =>
        Promise.resolve(newCreatedUser)
      )

      await actions.login({ commit, dispatch }, firebaseUser)

      expect(commit).toHaveBeenCalledWith('setUser', newCreatedUser)
    })

    it('should get products for the user', async () => {
      mockUsersDbRead.mockResolvedValue(Promise.resolve(user))

      await actions.login({ commit, dispatch }, firebaseUser)

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

    it('should not push any page if the current page is authorized', async () => {
      router.app = { $route: { meta: { authNotRequired: true } } }
      jest.spyOn(router, 'push')

      await actions.logout({ commit, dispatch })

      expect(push).not.toHaveBeenCalled()
    })
  })
})
