import mutations from '@/store/authentication/authentication.mutations'

const user = {
  displayName: 'Robert Bob',
  photoUrl: 'https://my-awesome-photo.com',
  email: 'robert.bob@mail.com'
}

describe('authentication module mutation', () => {
  describe('setUser', () => {
    it('should set the user to the given parameter', () => {
      const state = {
        user: null
      }
      mutations.setUser(state, user)
      expect(state).toEqual({
        user
      })
    })
  })
})
