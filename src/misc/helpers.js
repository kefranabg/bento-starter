import UsersDB from '@/firebase/users-db'

/**
 * Create new user from firebase auth user infos
 */
export const createNewUserFromFirebaseAuthUser = async firebaseAuthUser => {
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
