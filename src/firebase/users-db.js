import GenericDB from './generic-db'

export class UsersDB extends GenericDB {
  constructor() {
    super('users')
  }
}
