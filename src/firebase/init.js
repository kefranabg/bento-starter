import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyCe6CSzOUs6_Ij_VHa6hancdEi6CNBtw7c',
  authDomain: 'bento-starter.firebaseapp.com',
  databaseURL: 'https://bento-starter.firebaseio.com',
  projectId: 'bento-starter',
  storageBucket: 'bento-starter.appspot.com',
  messagingSenderId: '458464977217'
}

firebase.initializeApp(config)
