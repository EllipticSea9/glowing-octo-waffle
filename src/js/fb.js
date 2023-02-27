  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
  import {getAuth, signInWithPopup, GoogleAuthProvider} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'
  import { getFirestore,doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCpl3eGDNqLqv59iaRTmcnU1Mg8iN0q2dI",
    authDomain: "momy-aa415.firebaseapp.com",
    projectId: "momy-aa415",
    storageBucket: "momy-aa415.appspot.com",
    messagingSenderId: "1065990920173",
    appId: "1:1065990920173:web:dbb8f8d9e3da10a230f9e4",
    measurementId: "G-LLMNCDV4ZM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth();
  export const provider = new GoogleAuthProvider();
  export const db = getFirestore(app);