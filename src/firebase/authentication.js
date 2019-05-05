import firebase from 'firebase/app'
import isNil from 'lodash/isNil'

import store from '@/store'

firebase.auth().onAuthStateChanged(firebaseUser => {
  const actionToDispatch = isNil(firebaseUser) ? 'logout' : 'login'
  store.dispatch(`authentication/${actionToDispatch}`, firebaseUser)
})
