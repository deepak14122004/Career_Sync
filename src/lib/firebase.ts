import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';
import { getFirestore } from "firebase/firestore";

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;
import { env } from '$env/dynamic/public';

const firebaseConfig = {
    apiKey: env.PUBLIC_APIKEY,
    authDomain: env.PUBLIC_AUTHDOMAIN,
    projectId: env.PUBLIC_PROJECTID,
    storageBucket: env.PUBLIC_STORAGEBUCKET,
    messagingSenderId: env.PUBLIC_MESSAGINGSENDERID,
    appId: env.PUBLIC_APPID,
    measurementId: env.PUBLIC_MEASUREMENTID,
  };
  

export const initializeFirebase = () => {
 if (!browser) {
  throw new Error("Can't use the Firebase client on the server.");
 }
 if (!app) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db= getFirestore(app);

  
 }
};