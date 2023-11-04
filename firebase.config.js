// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_g-VV6b73nZggIrs8TzYeTHngETogGfY",
  authDomain: "projectspl.firebaseapp.com",
  projectId: "projectspl",
  storageBucket: "projectspl.appspot.com",
  messagingSenderId: "98612709635",
  appId: "1:98612709635:web:02098548b59e290488c136",
  measurementId: "G-1SZBGB5MNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
export { auth, db };