import 'firebase/auth';
import * as firebase from 'firebase/app'
import 'firebase/firestore';

import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

import { authState } from 'rxfire/auth';
import { filter } from 'rxjs/operators';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { userUpload } from './fireActions';

// TODO: Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDxoPpCjQV3XKuepEAOoHl9xevYqcgLzIA",
  authDomain: "trends-sp22-lecture-8.firebaseapp.com",
  projectId: "trends-sp22-lecture-8",
  storageBucket: "trends-sp22-lecture-8.appspot.com",
  messagingSenderId: "315957441950",
  appId: "1:315957441950:web:f6da25bdddd8ed7d7c528f"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  'login_hint': 'user@example.com',
  'hd': 'cornell.edu'
});
provider.addScope('email');

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    userUpload(user, db);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

export { db }
