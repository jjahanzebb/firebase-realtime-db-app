// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Import your Firebase config here
import { config } from "./firebase.config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = config;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initializing database
export const db = getDatabase(app);
