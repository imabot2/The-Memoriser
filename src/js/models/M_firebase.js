/**
 * @file /model/firebase.js
 * @brief Model that initialize Firebase and returns the current app object
 * @author Philippe Lucidarme 
 */


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// Import the firebase config from a private file
import firebaseConfig from "Js/firebase-config.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;