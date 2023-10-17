// Load authentification view and model
import view from "Js/views/V_sign-up.js";
import model from "Js/models/M_auth.js";
import notifications from "Js/views/V_notifications";



/**
 * Class Controller SignUp, manage authentification (login, logout ...)
 */
class C_SignUp {



  /**
   * Constructor, initialize the Firebase authentification
   */
  constructor() {
  }


  /**
   * Submit a new user based on email and password
   * @param {string} email email address of the new user
   * @param {*} password password of the new user
   * @returns a promise resolved if the user is created
   */
  submitNewUser(email, password) {

    // Return a promise on user creation
    return new Promise((resolve, reject) => {

      // Create the new user
      model.submitNewUser(email, password)
        .then(() => {
          model.sendVerificationEmail().then(() => {
            notifications.success("Account created", `Your account has been succesfully created.`);
            view.hideSignUpForm();
          })
        })
        .catch((error) => {

          // An error occured during user creation, notify the user
          console.error(error);
          switch (error) {
            case "auth/email-already-in-use": notifications.error("Account creation failed", `An account with email <b>${email}</b> already exists.`); break;
            default:
              notifications.error("Account creation failed", `An unexpected error occured.`);
          }
          reject();
        })
    })
  }

}

export default new C_SignUp();