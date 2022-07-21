import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc, ///retrieve data
  getDoc, ///read/view data
  setDoc, ///update data
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX8B4UaDt2WlFb2c_Cd0nOZz9jOTZxKJ8",
  authDomain: "happy-tails-database.firebaseapp.com",
  projectId: "happy-tails-database",
  storageBucket: "happy-tails-database.appspot.com",
  messagingSenderId: "3793666324",
  appId: "1:3793666324:web:20068ad1cc1ded3e05c201",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore(); ///this singleton instance that lets access and perform CRUD inside firestore...

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.messagingSenderId);
    }
  }
  return userDocRef;
};
