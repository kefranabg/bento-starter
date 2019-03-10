import helpers from '@/misc/helpers'
import { UsersDB } from '@/firebase/users-db'

jest.mock('@/firebase/users-db', () => ({
  UsersDB: jest.fn()
}))

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
      UsersDB.mockImplementationOnce(() => ({
        create: () => Promise.resolve(newUser)
      }))
      UsersDB.mockResolvedValue()
      const createdUser = await helpers.createNewUserFromFirebaseAuthUser(
        firebaseUser
      )

      expect(createdUser).toBe(newUser)
    })
  })
})
