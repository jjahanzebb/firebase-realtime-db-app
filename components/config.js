// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database/";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlIN1jiT52uo2ba7t89UqbJO3kCj1J1z4",
  authDomain: "realtime-db-app-cf140.firebaseapp.com",
  projectId: "realtime-db-app-cf140",
  storageBucket: "realtime-db-app-cf140.appspot.com",
  messagingSenderId: "328214584818",
  appId: "1:328214584818:web:a8d5f6d6af6b63e2365f6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database ande export
export const db = getDatabase(app);
