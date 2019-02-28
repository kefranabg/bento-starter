import firebase from 'firebase/app'
import { isNil, keys, cloneDeep } from 'lodash'

export default class GenericDB {
  constructor(collectionPath) {
    this.collectionPath = collectionPath
  }

  /**
   * Create a document in the collection
   * @param data
   * @param id
   */
  async create(data, id = null) {
    const collectionRef = firebase.firestore().collection(this.collectionPath)
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

    const dataToCreate = {
      ...data,
      createTimestamp: serverTimestamp,
      updateTimestamp: serverTimestamp
    }

    const createPromise = isNil(id)
      ? // Create doc with generated id
        collectionRef.add(dataToCreate).then(doc => doc.id)
      : // Create doc with custom id
        collectionRef
          .doc(id)
          .set(dataToCreate)
          .then(() => id)

    const docId = await createPromise

    return {
      id: docId,
      ...data,
      createTimestamp: new Date(),
      updateTimestamp: new Date()
    }
  }

  /**
   * Read a document in the collection
   * @param id
   */
  async read(id) {
    const result = await firebase
      .firestore()
      .collection(this.collectionPath)
      .doc(id)
      .get()

    const data = result.exists ? result.data() : null

    if (isNil(data)) return null

    this.convertObjectTimestampPropertiesToDate(data)
    return { id, ...data }
  }

  /**
   * Read all documents in the collection following constraints
   * @param constraints
   */
  readAll(constraints = null) {
    const collectionRef = firebase.firestore().collection(this.collectionPath)
    let query = collectionRef

    if (constraints) {
      constraints.forEach(constraint => (query = query.where(...constraint)))
    }

    const formatResult = result =>
      result.docs.map(ref =>
        this.convertObjectTimestampPropertiesToDate({
          id: ref.id,
          ...ref.data()
        })
      )

    return query.get().then(formatResult)
  }

  /**
   * Update a document in the collection
   * @param data
   */
  async update(data) {
    const id = data.id
    const clonedData = cloneDeep(data)
    delete clonedData.id

    await firebase
      .firestore()
      .collection(this.collectionPath)
      .doc(id)
      .update({
        ...clonedData,
        updateTimestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

    return id
  }

  /**
   * Delete a document in the collection
   * @param id
   */
  delete(id) {
    return firebase
      .firestore()
      .collection(this.collectionPath)
      .doc(id)
      .delete()
  }

  /**
   * Convert all object Timestamp properties to date
   * @param obj
   */
  convertObjectTimestampPropertiesToDate(obj) {
    keys(obj)
      .filter(prop => obj[prop] instanceof Object)
      .forEach(prop =>
        obj[prop] instanceof firebase.firestore.Timestamp
          ? (obj[prop] = obj[prop].toDate())
          : this.convertObjectTimestampPropertiesToDate(obj[prop])
      )
    return obj
  }
}
