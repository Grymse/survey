import { initializeApp } from "firebase/app";
import { debugErrorMap, FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function signinWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

function signinWithFacebook() {
  return signInWithPopup(auth, facebookProvider);
}


// @ts-expect-error TypeScript thinks it's a string, but it's a function
const errorMap = debugErrorMap();

async function removeUser() {
  try {
    return await auth.currentUser?.delete();
  } catch (e: unknown) {

    if (!(e instanceof Error)) {
      throw e;
    }
    const authErrorCode = e.message.split('(auth/')[1]?.split(')')[0];
    throw new Error(errorMap[authErrorCode] ?? authErrorCode);
  }
  return;
}

function signout() {
  return auth.signOut();
}

async function save(responses: Map<number,string>): Promise<void> {
  await setDoc(getResponsesRef(), {
    responses: Object.fromEntries(responses),
  });
}

function getResponsesRef() {
  const responsesCollection = collection(getFirestore(app), "responses");
  
  const auth = getAuth(app);
  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  const userId = auth.currentUser.uid;
  return doc(responsesCollection, userId);
}

async function load(): Promise<Map<number,string>> {
  const docSnapshot = await getDoc(getResponsesRef());

  if (!docSnapshot.exists()) {
    throw new Error("Responses not found");
  }

  const responses = docSnapshot.data()?.responses;
  const map = new Map(Object.entries(responses).map(([key, value]) => [parseInt(key), value]));

  // Run through all entries in the map. In case the key is not a number, delete it.
  for (const [key, value] of map.entries()) {
    if (typeof key !== "number" || typeof value !== "string") {
      map.delete(key);
    }
  }

  return map as Map<number,string>;
}

async function remove(): Promise<void> {
  return deleteDoc(getResponsesRef());
}

export default { save, load, remove, removeUser, signinWithGoogle, signinWithFacebook, signout };
