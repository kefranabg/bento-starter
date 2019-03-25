import helpers from '@/misc/helpers'

const mockCreate = jest.fn()
jest.mock('@/firebase/users-db', () =>
  jest.fn().mockImplementation(() => ({ create: mockCreate }))
)

const user = {
  displayName: 'Robert Bob',
  photoUrl: 'https://my-awesome-photo.com',
  email: 'robert.bob@mail.com'
}
const newUser = {
  displayName: 'New user',
  photoUrl: 'https://new-user-photo.com',
  email: 'new.user@mail.com'
}

describe('helpers', () => {
  describe('createNewUserFromFirebaseAuthUser', () => {
    it('should set user with the created user', async () => {
      const firebaseUser = { providerData: [user] }
      mockCreate.mockResolvedValue(Promise.resolve(newUser))
      const createdUser = await helpers.createNewUserFromFirebaseAuthUser(
        firebaseUser
      )

      expect(createdUser).toBe(newUser)
    })
  })
})
