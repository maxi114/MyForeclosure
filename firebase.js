// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzfTT5DWHAVwZh3Mj19WItGxvHxkNHPlM",
  authDomain: "flash-cards-13c04.firebaseapp.com",
  projectId: "flash-cards-13c04",
  storageBucket: "flash-cards-13c04.appspot.com",
  messagingSenderId: "550623645995",
  appId: "1:550623645995:web:3cde542f96d46a1d6a356e",
  measurementId: "G-Q14T0KFBMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;