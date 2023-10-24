import * as bootstrap from 'bootstrap';


/**
 * Class Auth, manage the view for the authentification (login, sign up, log out ...)
 */
class Notifications {

  /**
   * Constructor, get DOM toast container and template
   */
  constructor() {

    // Toast container
    this.container = document.getElementById("toast-container");

    // Toast template
    this.template = document.getElementById("toast-template");
  }


  /**
   * Display an error toast
   * @param {string} title Title of the toast
   * @param {string} message Message to display in the body of the toast
   * @param {integer} message Message delay in milliseconds
   */
  error(title, message, ms) {

    // Create a new toast by cloning the template    
    let toastEl = this.template.cloneNode(true);

    // Set the toast color and icon 
    toastEl.querySelector(".toast-title").innerHTML = `<i class="bi bi-x-circle-fill me-2"></i> ${title}`;
    toastEl.querySelector(".toast-header").classList.add("text-bg-danger");
    toastEl.querySelector(".btn-close").classList.add("btn-close-white");

    // Set the requested message in the toast body
    toastEl.querySelector(".toast-body").innerHTML = message;

    this.show(toastEl, ms);
  }


  /**
  * Display a warning toast
  * @param {string} title Title of the toast
  * @param {string} message Message to display in the body of the toast
  * @param {integer} message Message delay in milliseconds 
  */
  warning(title, message, ms) {

    // Create a new toast by cloning the template    
    let toastEl = this.template.cloneNode(true);

    // Set the toast color and icon
    toastEl.querySelector(".toast-title").innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i> ${title}`;
    toastEl.querySelector(".toast-header").classList.add("text-bg-warning");
    toastEl.querySelector(".toast-header").classList.add("text-white");

    // Set the requested message in the toast body
    toastEl.querySelector(".toast-body").innerHTML = message;

    this.show(toastEl, ms);
  }


  /**
 * Display a success toast
 * @param {string} title Title of the toast
 * @param {string} message Message to display in the body of the toast
 * @param {integer} message Message delay in milliseconds
 */
  success(title, message, ms) {

    // Create a new toast by cloning the template    
    let toastEl = this.template.cloneNode(true);

    // Set the toast color and icon
    toastEl.querySelector(".toast-title").innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> ${title}`;
    toastEl.querySelector(".toast-header").classList.add("text-bg-success");
    toastEl.querySelector(".btn-close").classList.add("btn-close-white");

    // Set the requested message in the toast body
    toastEl.querySelector(".toast-body").innerHTML = message;

    this.show(toastEl, ms);
  }


  /**
 * Display an info toast
 * @param {string} title Title of the toast
 * @param {string} message Message to display in the body of the toast
 * @param {integer} message Message delay in milliseconds
 */
  info(title, message, ms) {

    // Create a new toast by cloning the template    
    let toastEl = this.template.cloneNode(true);

    // Set the toast color and icon
    toastEl.querySelector(".toast-title").innerHTML = `<i class="bi bi-info-square-fill me-2"></i> ${title}`;
    toastEl.querySelector(".toast-header").classList.add("text-bg-primary");
    toastEl.querySelector(".btn-close").classList.add("btn-close-white");

    // Set the requested message in the toast body
    toastEl.querySelector(".toast-body").innerHTML = message;

    this.show(toastEl, ms);
  }


  /**
  * Display a message toast
  * @param {string} title Title of the toast
  * @param {string} message Message to display in the body of the toast
  * @param {integer} message Message delay in milliseconds
  */
  message(title, message, ms) {

    // Create a new toast by cloning the template    
    let toastEl = this.template.cloneNode(true);

    // Set the toast color and icon
    toastEl.querySelector(".toast-title").innerHTML = `${title}`;

    // Set the requested message in the toast body
    toastEl.querySelector(".toast-body").innerHTML = message;

    this.show(toastEl, ms);
  }


  /**
   * Convert a DOM element to bootstrap toast and show the toast
   * The DOM element is removed once the toast is hidden
   * @param {object} toastEl The DOM toast element
   */
  show(toastEl, ms) {

    // Append the toast
    this.container.prepend(toastEl);

    // Configure and show the toast
    let toast = new bootstrap.Toast(toastEl, { animation: true, autohide: true, delay: ms ?? 3000 });
    toast.show();

    // Remove the toast from DOM when hidden
    toastEl.addEventListener('hidden.bs.toast', () => { toastEl.remove(); });
  }



}

export default new Notifications();