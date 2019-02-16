import GenericDB from './generic-db'

class UsersDB extends GenericDB {
  constructor() {
    super('users')
  }
}

export default new UsersDB()
