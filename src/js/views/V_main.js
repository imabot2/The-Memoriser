// Load bootstrap and CSS
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "Assets/css/style.css";



class V_Main {
  constructor() {
    // Get main element and answer input
    this.main = document.getElementById("main");
    

    // Initialize bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


    // Initialize bootstrap toasts
    const toastElList = document.querySelectorAll('.toast');
    [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, { animation: true, autohide: true, delay: 10000 }));

    // Get the loader container element
    this.loaderEl = document.getElementById("loader");

    // On resize, resize the main container     
    window.visualViewport.addEventListener('resize', () => {this.onResize(); });

    this.onResize();

  }


  /**
  * Resize the main container to the current height / width
  */
  onResize() {
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.main.style.width = `${window.visualViewport.width}px`;
    this.main.style.height = `${window.visualViewport.height}px`;
  }
 

  /**
   * Hide the loader overlay
   * @param {integer} ms Fade out duration in milliseconds
   */
  hideLoader(ms) {

    // Set deflaut time is ms is not provided
    ms = ms ?? 250;
    // Set transition time and start transition
    this.loaderEl.style.transition = `opacity ${ms}ms ease-in-out`;    
    this.loaderEl.style.opacity = 0;

    // Start a timer to hide the overlay (prevent keeping the overlay over page content)
    setTimeout(() => {
      this.loaderEl.classList.add("d-none");
    }, ms);
  }

}


export default new V_Main();