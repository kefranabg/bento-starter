import GenericDB from './generic-db'

export default class UserProductsDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/products`)
  }

  // Here you can extend UserProductsDB with custom methods
}
