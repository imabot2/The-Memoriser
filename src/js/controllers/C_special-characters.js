import view from "Js/views/V_special-characters.js";
import memoryTest from "Js/views/V_memory-test.js";

class M_SpecialCharacters {

  /**
   * Constructor 
   */
  constructor() {
    // Store a copy of the character list
    this.charactersList = [];

    // Set the callback functin
    view.setButtonClickCallback((i) => { this.onCharacterSelected(i) });

    // Callback function when the modal is hidden
    view.setHiddenModalCallback(() => {
      // Set focus in the answer bar
      memoryTest.focus();
    })
  }


  /**
   * Callback function called when the character is clicked
   * @param {integer} index The index of the character in the array
   */
  onCharacterSelected(index) {    
    memoryTest.insertAtCaret(this.charactersList[index]);
    view.hideModal();
  }


  /**
   * Set a new list of special characters
   * @param {array} list Array of special characters
   */
  set(list) {

    // If this is not a new list, do nothing
    if (list == this.charactersList) { return;}

    // Store the characters
    this.charactersList  = list;

    // If there is no characters in the list, disable the button
    if (list.length==0) { view.disableModalButton(); return;}
    
    // Populate the modal
    view.populate(list);
    
    // Enable the button
    view.enableModalButton();
  }



  showModal(focusOnFirst) {
    // If there is no special characters, do not open the modal
    if (this.charactersList.length==0) return;

    // Open the mosdal
    view.showModal();

    // If focus is requested, set focus on first character
    if (focusOnFirst) view.setFocusOnFirst();
  }

}


export default new M_SpecialCharacters();