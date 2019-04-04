import firebase from 'firebase/app'

let loaded = false

export default async () => {
  if (!loaded) {
    await import('firebase/firestore')
    firebase.firestore().settings({})
    firebase
      .firestore()
      .enablePersistence({ experimentalTabSynchronization: true })
    loaded = true
  }
  return Promise.resolve(firebase.firestore())
}
