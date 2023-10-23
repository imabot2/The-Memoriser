import app from "Js/models/M_firebase.js";
import { getAuth, reload, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


/**
 * Class Auth, manage sign up
 */
class M_Auth {

  /**
   * Constructor, initialize the Firebase authentification
   */
  constructor() {
    // Initialize Firebase Authentication and get a reference to the service
    this.auth = getAuth(app);
    this.providerGoogle = new GoogleAuthProvider();

    // Default callback functions
    this.onSignInCallback = () => { };
    this.onSignOutCallback = () => { };
    this.onEmailNotVerifiedCallback = () => { };



    // Event listener on authentification changed
    onAuthStateChanged(this.auth, (user) => {

      // A user is logged
      if (user) {

        // The user is logged in, run the call balck
        this.onSignInCallback();

        // The user is logged, but the email is not verified
        // Run the callback and logout, exception is made if the account has been created for less than 
        if (!user.emailVerified) this.onEmailNotVerifiedCallback(user.email);
      }
      else {
        this.onSignOutCallback();
      }
    });
  }

  
  /**
   * Return a promise when the user status changed
   * @returns {promise} A promise with the user credentials
   */
  onUserStateChanged() {
    return new Promise((resolve) => {      
      onAuthStateChanged(this.auth, (user) => { resolve(user); })
    })
  }


  /**
   * Return the current user data
   * @returns The current user data
   */
  refreshUserStatus() {
    return reload(this.auth.currentUser);
  }

  /**
   * Check if the user is logged with a verified email
   * @returns True if the user is logged with a verified email, false otherwise
   */
  isLogged() {

    // If the user is not logged, return false
    if (this.auth.currentUser === null) return false;
    // If the user email has not been verified, return false
    if (!this.auth.currentUser.emailVerified) return false;
    // The user is logged, return true
    return true;
  }

  /**
   * Refresh user auth and check if the email has been verified
   * @returns True if the email is verified
   */
  isEmailVerified() {
    return this.auth.currentUser.emailVerified;
  }
  /**
   * 
   * @param {function} callback Callback function called when the email is not verified
   */
  onEmailNotVerified(callback) {
    this.onEmailNotVerifiedCallback = callback;
  }


  /**
   * Set the callback function called when the user log in
   * @param {function} callback Callback function called when the user log in
   */
  onSignIn(callback) {
    this.onSignInCallback = callback;
  }


  /**
   * Set the callback function called when the user log out
   * @param {function} callback Callback function called when the user log out
   */
  onSignOut(callback) {
    this.onSignOutCallback = callback;
  }

  /**
 * Return the current user email used for authentification
 * @returns The user email or undefined if the user is not logged in
 */
  getUserID() {
    if (this.auth.currentUser === null) return undefined;
    return this.auth.currentUser.uid;
  }


  /**
   * Return the current user email used for authentification
   * @returns The user email or undefined if the user is not logged in
   */
  getUserEmail() {
    if (this.auth.currentUser === null) return undefined;
    return this.auth.currentUser.email;
  }

  /**
   * Return the current user name
   * @returns The user name or email if displayName is not defined
   */
  getUserName() {
    if (this.auth.currentUser === null) return undefined;
    if (this.auth.currentUser.displayName) return this.auth.currentUser.displayName;
    return this.auth.currentUser.email;
  }

  /**
   * Get the user picture 
   * @returns the URL of the user picture, or undefined if the user has no picture
   */
  getUserPicture() {
    if (this.auth.currentUser === null) return undefined;
    return this.auth.currentUser.photoURL;
  }


  /**
   * Return the account lifetime
   * @returns the elapsed time in milliseconds since the account has been created
   */
  getAccountLifetime() {
    return Date.now() - this.auth.currentUser.metadata.createdAt;
  }


  /**
   * Register a new user in Firebase
   * @param {string} email The email address of the new user
   * @param {string} password The password of the new user
   */
  submitNewUser(email, password) {
    return new Promise((resolve, reject) => {

      // Create the new user
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          resolve(userCredential);
        })
        .catch((error) => {
          reject(error.code);
        });

    })
  }


  /**
   * Send a verification email to a given user
   */
  sendVerificationEmail() {
    return new Promise((resolve, reject) => {

      // Send the verification email
      sendEmailVerification(this.auth.currentUser)
        .then(() => {
          // Email sent successfully
          resolve(this.auth.currentUser.email);
        })
        .catch((error) => {
          // An error occured while sending the email
          console.error(error)
          reject(error.code);
        });
    });
  }

  /**
   * Send a reset password email
   * @param {string} email Email address of the user
   * @returns a promise
   */
  sendPasswordResetEmail(email) {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(this.auth, email)
        .then(() => { resolve(); })
        .catch((error) => { reject(error.code); });
    })
  }


  /**
   * Sign a user in with email / password
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @returns a promise
   */
  signIn(email, password) {
    return new Promise((resolve, reject) => {

      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => { resolve(); })
        .catch((error) => { reject(error.code); });
    })
  }



  /**
   * Sign in with Google account
   * @returns a promise
   */
  signInWithGoogle() {

    return new Promise((resolve, reject) => {

      signInWithPopup(this.auth, this.providerGoogle)
        .then(() => { resolve(); })
        .catch((error) => {
          switch (error.code) {
            case "auth/popup-closed-by-user": reject("Popup window closed by user while login with Google");
            default: reject("Unkown error while login with Google");
          }
        })
    });
  }


  /**
   * Log out the current user
   * @returns a promise on log out
   */
  logOut() {
    return signOut(this.auth);
  }
}

export default new M_Auth();