import GenericDB from './generic-db'

export default class UsersDB extends GenericDB {
  constructor() {
    super('users')
  }
}
