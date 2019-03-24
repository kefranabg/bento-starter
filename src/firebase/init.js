import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyCYfRz6wyhXKOLIpVCcSRWw0_tWiabJl44',
  authDomain: 'vue-firebase-starter-kit.firebaseapp.com',
  databaseURL: 'https://vue-firebase-starter-kit.firebaseio.com',
  projectId: 'vue-firebase-starter-kit',
  storageBucket: 'vue-firebase-starter-kit.appspot.com',
  messagingSenderId: '353733958620'
}

firebase.initializeApp(config)
firebase.firestore().settings({})
firebase.firestore().enablePersistence({ experimentalTabSynchronization: true })
