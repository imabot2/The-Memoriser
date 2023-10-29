import "Assets/css/special-characters.css";
import * as bootstrap from 'bootstrap';

class V_SpecialCharacters {

  /**
   * Constructor
   */
  constructor() {

    // Initialize the modal
    this.modalEl = document.getElementById("special-characters");
    this.modal = new bootstrap.Modal(this.modalEl);

    // Initialize the container with the buttons and add event listener to catch button click
    this.countainerEl = this.modalEl.querySelector('.list');
    this.countainerEl.addEventListener("click", (e) => { this.onButtonClick(e); });

    // Set the modal callback function
    this.onModalShowCallback = () => { };
    this.modalEl.addEventListener('show.bs.modal', () => { this.onModalShowCallback(); });

    this.onModalHiddenCallback = () => { };
    this.modalEl.addEventListener('hidden.bs.modal', () => { this.onModalHiddenCallback(); });

    // Default callback for button clicked
    this.onButtonClickedCallback = () => {};

    this.showModal();
  }


  
  /**
   * Populate the special characters modal
   * @param {array} list Array of characters to populate
   */
  populate(list) {
    console.log (list)
    // Empty the container
    this.countainerEl.innerHTML = "";

    // Populate the character list
    list.forEach((character, index) => {
      this.countainerEl.innerHTML += `<button type="button" class="btn btn-lg btn-outline-dark m-2" data-index="${index}">${character}</button>`;
    });

  }

  /**
   * Show the modal
   */
  showModal() {
    this.modal.show();
  }

  /**
   * Hide the modal
   */
  hideModal() {
    this.modal.hide();
  }




  /**
   * Callback function triggered when a button is clicked
   * @param {event} event The container event
   */
  onButtonClick(event) {
    let index = event.target.getAttribute("data-index");
    this.onButtonClickedCallback(index);
  }

  /**
   * Set the callback function called when the modal is show
   * @param {function} callback Function called when the modal is show
   */
  setButtonClickCallback(callback) {
    this.onButtonClickedCallback = callback;
  }


  /**
   * Set the callback function called when the modal is show
   * @param {function} callback Function called when the modal is show
   */
  setShowModalCallback(callback) {
    this.onModalShowCallback = callback;
  }


  /**
   * Set the callback function called when the modal is hide
   * @param {function} callback Function called when the modal is hide
   */
  setHiddenModalCallback(callback) {
    this.onModalHiddenCallback = callback;
  }


}


export default new V_SpecialCharacters();