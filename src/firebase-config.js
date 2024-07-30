// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkmS_v33q4X6zCLxyCzK7rx7R6nWD8lMU",
  authDomain: "blogproject-9299f.firebaseapp.com",
  projectId: "blogproject-9299f",
  storageBucket: "blogproject-9299f.appspot.com",
  messagingSenderId: "88164017925",
  appId: "1:88164017925:web:7098a2e8913917f3fbb96c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();