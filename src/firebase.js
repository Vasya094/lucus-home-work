import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAmu5wKR6r75K2wITlTA15DYogiDpPljaM',
  authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.APP_FIREBASE_DATABASE_URL,
  projectId: process.env.APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export default app