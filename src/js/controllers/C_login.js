import view from "Js/views/V_login.js";
import model from "Js/models/M_auth.js";
import notifications from "Js/views/V_notifications";
import signUpView from "Js/views/V_sign-up.js";



/**
 * Class Controller SignUp, manage authentification (login, logout ...)
 */
class C_LogIn {

  /**
   * Constructor, initialize the Firebase authentification
   */
  constructor() {

    // At start up, the user is not logged in
    this.isLoggedIn = false;


    model.onSignIn(() => { this.onSignIn(); });
    model.onSignOut(() => { this.onSignOut(); });
    model.onEmailNotVerified(() => { this.onEmailNotVerified(); });



  }

  /**
   * Callback function called when the user is logged in
   */
  onSignIn() {
    // If the user is not yet logged, display the notification
    if (!this.isLoggedIn) {
      // If email is verified, user is logged
      if (model.isEmailVerified()) notifications.info("You are logged in", `You are logged in as ${model.getUserName()}.`, 2000);
      // If email is not verified and this is not a new account, inform the user
      else if (model.getAccountLifetime() > 5000) notifications.warning("Email not verified", `You are logged in with ${model.getUserEmail()}, but your email has not been verified.`);
    }

    // The user is now logged
    this.isLoggedIn = true;

    // Hide the login form
    view.hideLogInForm();

    // Update user picture or log out icon
    let picture = model.getUserPicture();
    if (picture) view.setLogInTopButton(picture, `You are logged as ${model.getUserName()}. Click to log out.`);
    else view.showLogOutButton();
  }

  /**
   * Callback function called when the user is logged out
   */
  onSignOut() {
    if (this.isLoggedIn) notifications.info("Logged out", "You've been logged out");
    this.isLoggedIn = false;
    view.showLogInButton();
  }


  /**
   * Callback function called when the user is logged in with a non verified email
   */
  onEmailNotVerified() {
    // Close the sign in / sign up forms
    view.hideLogInForm();    
    signUpView.hideSignUpForm();
    // Show the email verificatiojn message
    view.showVerificationEmailMessage(model.getUserEmail());
    
    // Check for email verification
    this.checkForEmailVerified();
  }

  /**
   * Refresh used authentification data and check if the email has been verified
   * Once the email is verified, close the message and push a notification
   */
  checkForEmailVerified() {

    // Every 3 seconds, check for email verification
    setTimeout(() => {
      model.refreshUserStatus().then(() => {
        if (model.isEmailVerified()) {
          notifications.success("Email verified", "Your email has been successfully verified.");
          view.hideVerificationEmailMessage();
        }
        else this.checkForEmailVerified();
      })
    }, 3000)
  }


  /**
   * Callcack function called when the auth main button is clicked
   */
  onTopButtonAction() {
    // If the user is already logged, log out when the button is clicked
    // Otherwise, if the user is not logged, open the login modal
    if (this.isLoggedIn) model.logOut(); else view.showLogInForm();


  }


  /**
   * Login with email and password
   * @param {string} email email of the user
   * @param {*} password password of the user
   */
  logIn(email, password) {
    
    // Disable the login submit button
    view.disableLoginButton()
    
    // Sign-in
    model.signIn(email, password)
    .then(() => { 
      view.enableLoginButton();
      view.hideLogInForm(); 
    })
    .catch((errorCode) => {
      view.enableLoginButton();
      console.log (errorCode);
      switch (errorCode) {
        case "auth/invalid-login-credentials": notifications.error("Wrong Credentials", `Invalid email and/or password.`); break;
        default:
          notifications.error("Login failed", `An unexpected error occured. Please retry later.`);
      }
    });

  }



  /**
   * Sign in with Google account
   */
  signInWithGoogle() {
    view.disableLoginForm();
    view.disableLoginButton();
    model.signInWithGoogle()
    .catch((errorMsg) => {
      console.log (errorMsg);
    })
    .finally(() => {
      view.enableLoginForm();
      view.enableLoginButton();
    });
  }


  /**
   * Send a verification email to the last user logged
   */
  sendVerificationEmail() {

    // Disable the button to prevent too many requests
    view.disableResendEmailVerificationButton();
    model.sendVerificationEmail()
      .then((email) => {
        notifications.success("Verify your email!", `We've send an email to ${email}.<br> Open it up to activate your account.`);

        // Enable the button after one minute
        setTimeout(() => { view.enableResendEmailVerificationButton(); }, 10000);
      })
      .catch((errorCode) => {
        switch (errorCode) {
          case "auth/too-many-requests": notifications.error("Too many request", `Verification email has not been sent. Please retry later.`); break;
          default:
            notifications.error("Account creation failed", `An unexpected error occured. Please retry later.`);
        }
        // Enable the button after 30 seconds
        setTimeout(() => { view.enableResendEmailVerificationButton(); }, 30000);
      })
  }


  sendPasswordResetEmail(email) {
    view.disableLoginForm();
    view.disableLoginButton();
    model.sendPasswordResetEmail(email)
    .then(() => {
      view.hideLogInForm();
      notifications.success("Reset Password", `We've sent an email to <b>${email}</b> (if this email address is correct).<br> Click on the link in the email to reset your password.`, 8000);

    })
    .catch((errorCode) => {
      console.error (errorCode);
      view.enableLoginForm();
      view.enableLoginButton();
            
      switch (errorCode) {
        case "auth/too-many-requests": notifications.error("Too many request", `Reset password email has not been sent. Please retry later.`); break;
        default: notifications.error("Reset Password Failed", "An error occured while sending reset password email");
      }
    })
  }

}

export default new C_LogIn();