import GenericDB from './generic-db'

export class UsersDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/products`)
  }
}

export default userId => new UsersDB(userId)
