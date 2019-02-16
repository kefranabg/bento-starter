import firebase from 'firebase/app'
import { isNil } from 'lodash'
import 'firebase/auth'
import 'firebase/firestore'

import store from '@/store'

const config = {
  apiKey: 'AIzaSyCYfRz6wyhXKOLIpVCcSRWw0_tWiabJl44',
  authDomain: 'vue-firebase-starter-kit.firebaseapp.com',
  databaseURL: 'https://vue-firebase-starter-kit.firebaseio.com',
  projectId: 'vue-firebase-starter-kit',
  storageBucket: '',
  messagingSenderId: '353733958620'
}

firebase.initializeApp(config)
firebase.firestore().settings({})

firebase.auth().onAuthStateChanged(firebaseUser => {
  const actionToDispatch = isNil(firebaseUser) ? 'logout' : 'login'
  store.dispatch(`authentication/${actionToDispatch}`, firebaseUser)
})
