'use client'
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged,signOut, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, collection, addDoc, updateDoc, deleteDoc, doc,setDoc, onSnapshot, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();


export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged,signOut,db ,collection, addDoc, updateDoc, deleteDoc, doc, setDoc , onSnapshot,storage,getDocs,googleProvider }