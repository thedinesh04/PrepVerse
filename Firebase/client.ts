// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8EwhRcZCB3agSqlbSI3MrYa9FZKyZyFw",
    authDomain: "prepverse-353db.firebaseapp.com",
    projectId: "prepverse-353db",
    storageBucket: "prepverse-353db.firebasestorage.app",
    messagingSenderId: "1053889664986",
    appId: "1:1053889664986:web:33ea63041ecd7c2d7512e3",
    measurementId: "G-MVJ60TXF9B"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
