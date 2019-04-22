import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'

const mockCreate = jest.fn()
jest.mock('@/firebase/users-db', () =>
  jest.fn().mockImplementation(() => ({ create: mockCreate }))
)

describe('helpers', () => {
  describe('createNewUserFromFirebaseAuthUser', () => {
    it('should set user with the created user', async () => {
      const firebaseUser = { providerData: [{ id: 1 }] }
      const newUser = { id: 2 }
      mockCreate.mockResolvedValue(Promise.resolve(newUser))
      const createdUser = await createNewUserFromFirebaseAuthUser(firebaseUser)

      expect(createdUser).toBe(newUser)
    })
  })
})
