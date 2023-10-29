import view from "Js/views/V_special-characters.js";
import memoryTest from "Js/views/V_memory-test.js";

class M_SpecialCharacters {
  constructor() {
    // Store a copy of the character list
    this.charactersList = [];

    // Set the callback functin
    view.setButtonClickCallback((i) => { this.onCharacterSelected(i) });

    view.setHiddenModalCallback(() => {
      console.log ('focus');
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

}


export default new M_SpecialCharacters();