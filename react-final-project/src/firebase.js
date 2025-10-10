// Firebase's Code 
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//const firebaseConfig = {
//  apiKey: "AIzaSyDXRIvJ6qDIQODHzpNJIVB7SVYDHAv2n8g",
//  authDomain: "hospital-management-syst-bfa97.firebaseapp.com",
//  projectId: "hospital-management-syst-bfa97",
//  storageBucket: "hospital-management-syst-bfa97.firebasestorage.app",
//  messagingSenderId: "859112027407",
//  appId: "1:859112027407:web:4b69bde5a61cc67d74ba7a",
//  measurementId: "G-J6SF9JT825"
//};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


//  CHAT GPT's File 

// Import the Firebase functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXRIvJ6qDIQODHzpNJIVB7SVYDHAv2n8g",
  authDomain: "hospital-management-syst-bfa97.firebaseapp.com",
  projectId: "hospital-management-syst-bfa97",
  storageBucket: "hospital-management-syst-bfa97.firebasestorage.app",
  messagingSenderId: "859112027407",
  appId: "1:859112027407:web:4b69bde5a61cc67d74ba7a",
  measurementId: "G-J6SF9JT825"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export so you can use in other files
export { auth, db };
