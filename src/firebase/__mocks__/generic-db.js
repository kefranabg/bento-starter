export default class GenericDB {
  constructor(collectionPath) {
    this.collectionPath = collectionPath
    this.create = jest.fn()
    this.read = jest.fn()
    this.readAll = jest.fn()
    this.update = jest.fn()
    this.delete = jest.fn()
  }
}
