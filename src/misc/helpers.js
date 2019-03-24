import UsersDB from '@/firebase/users-db'

export default {
  /**
   * Create new user from firebase auth user infos
   */
  createNewUserFromFirebaseAuthUser: async firebaseAuthUser => {
    const providerData = firebaseAuthUser.providerData[0]
    const { displayName, photoURL, email } = providerData
    const userDb = new UsersDB()
    const user = {
      displayName,
      photoURL,
      email
    }

    return await userDb.create(user, firebaseAuthUser.uid)
  }
}
