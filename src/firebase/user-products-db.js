import GenericDB from './generic-db'

export class UserProductsDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/products`)
  }
}
