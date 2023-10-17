import * as bootstrap from "bootstrap";
import "Assets/css/auth.css";
import controller from "Js/controllers/C_login.js";
import { checkEmail } from "Js/lib/auth.js";

/**
 * Class Auth, manage the view for the authentification (login, sign up, log out ...)
 */
class V_LogIn {


  /**
   * Constructor, get elements and event listeners
   */
  constructor() {

    // Sign in form

    // Inputs
    this.loginEmail = document.getElementById("login-email");
    this.loginEmail.addEventListener("input", () => { this.onEmailChange(); })

    this.loginPassword = document.getElementById("login-password");

    // Validation button
    this.signInSubmit = document.getElementById("login-submit");
    this.signInSubmit.addEventListener("click", () => { this.onSubmitLogin() });

    this.signInGoogle = document.getElementById("google-login-button")
    this.signInGoogle.addEventListener("click", () => { this.onSignInWithGoogle() });

    this.topIcon = document.getElementById("auth-top-icon");
    this.topIcon.addEventListener("click", () => { controller.onTopButtonAction() });

    // Get the login modal element
    this.loginModalEl = document.getElementById("login-modal");
    this.loginModal = new bootstrap.Modal("#login-modal");

    // Focus on email input when modal is shown
    this.loginModalEl.addEventListener("shown.bs.modal", () => { this.loginEmail.focus(); })


    // Verify email modal

    // Get the login modal element
    this.verificationEmailModalEl = document.getElementById("verify-email-modal");
    this.verificationEmailModal = new bootstrap.Modal("#verify-email-modal");

    // Get the resend email button
    this.resendVerificationEmailButton = document.getElementById("resend-verification-email");
    this.resendVerificationEmailButton.addEventListener("click", () => { this.onResentVerificationEmail() });

    // Password lost
    this.resetPasswordButton = document.getElementById("reset-password-button");
    this.resetPasswordButton.addEventListener("click", (e) => { this.onResetPassword(e); });

  }


  /**
   * Call when the resend email verification button is clicked
   */
  onResentVerificationEmail() {
    controller.sendVerificationEmail();
  }


  /**
   * Disable the Resend Verification Email button
   */
  disableResendEmailVerificationButton() {
    this.resendVerificationEmailButton.classList.add("disabled");
  }

  /**
  * Enable the Resend Verification Email button
  */
  enableResendEmailVerificationButton() {
    this.resendVerificationEmailButton.classList.remove("disabled");
  }

  /**
   * Show the login icon at top right
   */
  showLogInButton() {
    this.setLogInTopButton("/static/icons/login.png", "Log in or sign up");
  }


  /**
   * Show the logout icon at top right
   */
  showLogOutButton() {
    this.setLogInTopButton("/static/icons/logout.png", "Click to log out");
  }


  /**
   * Set a custom image and tooltip text in the top right icon 
   * @param {string} imagePath URL or path to the image to display
   * @param {strnig} tooltip Text to display in the tooltip
   */
  setLogInTopButton(imagePath, tooltipContent) {
    
    // Get the image element
    let img = this.topIcon.querySelector("img");

    // Set the new image
    img.src = imagePath;

    // Update tooltip content
    const tooltip = bootstrap.Tooltip.getInstance("#auth-top-image");
    tooltip.setContent({ ".tooltip-inner": tooltipContent });

  }

  /**
   * Show the verification email modal
   */
  showVerificationEmailMessage(email) {

    if (email) document.getElementById("verify-email-address").innerText = email;
    this.hideLogInForm();
    this.verificationEmailModal.show();
  }

  /**
   * Hide the verification email modal
   */
  hideVerificationEmailMessage() {
    this.verificationEmailModal.hide();
  }

  /**
   * Open the login modal
   */
  showLogInForm() {
    this.enableLoginForm();
    this.signInSubmit.innerHTML = `Login`;
    this.loginModal.show();
  }

  /**
   * Hide the login modal
   */
  hideLogInForm() {
    this.loginModal.hide();
  }

  /**
   * This callback function is called when login with email/password is submitted
   */
  onSubmitLogin() {
    // Display the spinner in the button    
    controller.logIn(this.loginEmail.value, this.loginPassword.value);
  }

  disableLoginButton() {
    this.signInSubmit.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div>`
  }

  enableLoginButton() {
    this.signInSubmit.innerHTML = `Login`
  }


  /**
   * This callback function is called when the user click to log in with its Google account
   */
  onSignInWithGoogle() {
    controller.signInWithGoogle();
  }


  /**
   * Enable the inputs in the login form 
   */
  enableLoginForm() {
    this.loginEmail.classList.remove("disabled");
    this.loginPassword.classList.remove("disabled");
    this.signInSubmit.classList.remove("disabled");
    this.signInGoogle.classList.remove("disabled");
  }

  /**
   * Disable the inputs in the login form 
   */
  disableLoginForm() {
    this.loginEmail.classList.add("disabled");
    this.loginPassword.classList.add("disabled");
    this.signInSubmit.classList.add("disabled");
    this.signInGoogle.classList.add("disabled");
  }

  /**
   * Callback function called when the email input is changed
   */
  onEmailChange() {
    this.loginEmail.classList.remove("is-valid");
    this.loginEmail.classList.remove("is-invalid");
  }

  /**
   * Callback function called when the user click on the reset password button
   */
  onResetPassword(event) {

    event.preventDefault();

    // Check if the email is valid
    let emailValid = checkEmail(this.loginEmail.value);

    if (!emailValid) {
      this.loginEmail.classList.add("is-invalid");
      return;
    }

    // The email is valid, send the reset link
    controller.sendPasswordResetEmail(this.loginEmail.value);
  }

}

export default new V_LogIn();