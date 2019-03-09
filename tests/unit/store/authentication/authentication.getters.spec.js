import getters from '@/store/authentication/authentication.getters'

const user = {
  displayName: 'Robert Bob',
  photoUrl: 'https://my-awesome-photo.com',
  email: 'robert.bob@mail.com'
}

describe('authentication module getters', () => {
  describe('isUserLoggedIn', () => {
    it('should be false if the user is not logged in', () => {
      const state = { user: null }
      expect(getters.isUserLoggedIn(state)).toBe(false)
    })
    it('should be true if the user is logged in', () => {
      const state = { user }
      expect(getters.isUserLoggedIn(state)).toBe(true)
    })
  })
})
