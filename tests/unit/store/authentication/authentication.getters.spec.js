import getters from '@/store/authentication/authentication.getters'

describe('authentication module getters', () => {
  describe('isUserLoggedIn', () => {
    it('should be false if the user is not logged in', () => {
      const state = { user: null }
      expect(getters.isUserLoggedIn(state)).toBe(false)
    })

    it('should be true if the user is logged in', () => {
      const state = { user: { id: 1 } }
      expect(getters.isUserLoggedIn(state)).toBe(true)
    })
  })
})
