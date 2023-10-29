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

    // Get the button element that open the modal
    this.modalButtonEl = document.getElementById("special-characters-btn");
    this.modalButtonImgEl = this.modalButtonEl.querySelector('img');    
    this.modalButtonTooltip = bootstrap.Tooltip.getInstance(this.modalButtonImgEl);


    // Initialize the container with the buttons and add event listener to catch button click
    this.countainerEl = this.modalEl.querySelector('.list');
    this.countainerEl.addEventListener("click", (e) => { this.onButtonClick(e); });

    // Set the modal callback function
    this.onModalShowCallback = () => { };
    this.modalEl.addEventListener('show.bs.modal', () => { this.onModalShowCallback(); });

    this.onModalHiddenCallback = () => { };
    this.modalEl.addEventListener('hidden.bs.modal', () => { this.onModalHiddenCallback(); });

    // Default callback for button clicked
    this.onButtonClickedCallback = () => { };

  }



  /**
   * Populate the special characters modal
   * @param {array} list Array of characters to populate
   */
  populate(list) {
    // Empty the container
    this.countainerEl.innerHTML = "";

    // Populate the character list
    list.forEach((character, index) => {
      this.countainerEl.innerHTML += `<button type="button" class="btn btn-lg btn-outline-dark m-2" id="special-character-${index}" data-index="${index}">${character}</button>`;
    });

  }


  /**
   * Disable the button that open the modal
   */
  disableModalButton() {
    this.modalButtonEl.classList.add('disable');
    this.modalButtonEl.removeAttribute("data-bs-toggle");
    this.modalButtonTooltip.setContent({ '.tooltip-inner': 'There are no special characters for this question.'});
  }

  /**
   * Enable the button that open the modal
   */
  enableModalButton() {
    this.modalButtonEl.classList.remove('disable');
    this.modalButtonEl.setAttribute("data-bs-toggle", "modal");
    this.modalButtonTooltip.setContent({ '.tooltip-inner': 'Special characters, click or press Tab.'});
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
   * Set focus on the first character
   */
  setFocusOnFirst() {
    document.getElementById("special-character-0").focus();
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