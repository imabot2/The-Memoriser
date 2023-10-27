/**
 * @file /model/firebase.js
 * @brief Model that initialize Firebase and returns the current app object
 * @author Philippe Lucidarme 
 */


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Import the firebase config from a private file
import firebaseConfig from "Js/firebase-config.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;



// Export DB
export let  db = getFirestore(app);