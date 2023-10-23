// Load bootstrap and CSS
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "Assets/css/style.css";
import V_MainLoader from "Js/views/V_main-loader.js";



class V_Main extends V_MainLoader {
  constructor() {
    
    // Call the parent constructor
    super();

    // Get main element and answer input
    this.main = document.getElementById("main");
    

    // Initialize bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


    // Initialize bootstrap toasts
    const toastElList = document.querySelectorAll('.toast');
    [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, { animation: true, autohide: true, delay: 10000 }));

    // On resize, resize the main container     
    window.visualViewport.addEventListener('resize', () => {this.onResize(); });

    // Call the onResize function for first rendering
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
 


}


export default new V_Main();