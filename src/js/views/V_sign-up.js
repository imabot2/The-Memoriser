import * as bootstrap from 'bootstrap';
import "Assets/css/auth.css";
import controller from "Js/controllers/C_sign-up.js";
import { checkPassword, checkEmail } from "Js/lib/auth.js";


/**
 * Class Auth, manage the view for the authentification (login, sign up, log out ...)
 */
class V_SignUp {


  /**
   * Constructor, get elements and event listeners
   */
  constructor() {

    // Password feedback div
    this.signupPasswordFeedback = document.getElementById("sign-up-password-feedback");

    // Email input
    this.signUpEmail = document.getElementById("sign-up-email");
    this.signUpEmail.addEventListener("input", () => { this.signUpEmailChanged() });

    // Password input
    this.signUpPassword = document.getElementById("sign-up-password");
    this.signUpPassword.addEventListener("input", () => { this.signUpPasswordChanged() });

    // Validation button
    this.signUpSubmit = document.getElementById("sign-up-submit");
    this.signUpSubmit.addEventListener("click", () => { this.submitNewUser() });


    // Get the modal element
    this.signUpModalEl = document.getElementById("sign-up-modal");
    // Focus on email input when modal is shown
    this.signUpModalEl.addEventListener('shown.bs.modal', () => { this.signUpEmail.focus(); })

    this.signUpModal = new bootstrap.Modal("#sign-up-modal");
  }


  /**
     * This callback function is called when the signup email is changed
     */
  signUpEmailChanged() {

    // Check if the email is valid
    let emailValid = checkEmail(this.signUpEmail.value);
    if (emailValid) this.signUpEmail.classList.add("is-valid");
    else this.signUpEmail.classList.remove("is-valid");
  }


  /**
   * This callback function is called when the signup password is changed
   */
  signUpPasswordChanged() {

    // Check password and get message
    let passwordFeedback = checkPassword(this.signUpPassword.value);

    // Remove the invalid class
    this.signUpPassword.classList.remove("is-invalid");

    // Check password
    if (passwordFeedback === "") {
      // Password is valid
      this.signupPasswordFeedback.innerHTML = "";
      this.signUpPassword.classList.add("is-valid");
    }
    else {
      // Password is not valid
      this.signupPasswordFeedback.innerHTML = passwordFeedback;
      this.signUpPassword.classList.remove("is-valid");
    }


  }

  /**
   * This callback function is called when a new user is submited
   */
  submitNewUser() {

    // Check password
    let passwordFeedback = checkPassword(this.signUpPassword.value);
    if (passwordFeedback !== "") {
      this.signupPasswordFeedback.innerHTML = passwordFeedback;
      this.signUpPassword.classList.remove("is-valid");
      this.signUpPassword.classList.add("is-invalid");
    }

    // Check email
    let emailValid = checkEmail(this.signUpEmail.value);
    if (!emailValid) this.signUpEmail.classList.add("is-invalid");

    // Email and password are valid, submit the new user
    if (passwordFeedback === "" && emailValid) {

      // Display the spinner in the button
      this.signUpSubmit.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div>`

      // Submit the new user
      controller.submitNewUser(this.signUpEmail.value, this.signUpPassword.value)
        .then(() => {
          // New user is created, hide the modal
          this.hideSignUpForm();
        })
        .finally(() => {
          // Something wrong happened, remove the spinner 
          this.signUpSubmit.innerHTML = "Create Account";
        })

    }
  }


  /**
   * Show the sign up form (show the modal)
   */
  showSignUpForm() {
    this.signUpModal.show();
  }
  
  
  /**
   * Hide the sign up form (hide the modal)
   */
  
  hideSignUpForm() {
    this.signUpModal.hide();
  }
}





export default new V_SignUp();