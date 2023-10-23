import V_memoryTestCorrection from "Js/views/V_memory-test-correction.js";

/**
 * Manage the answer bar view (answer bar, submit button...)
 */
export default class V_MemoryTestAnswerBar extends V_memoryTestCorrection {

  constructor() {

    super();

    // Get the answer input
    this.answerInput = document.getElementById("answer-input");

    // Prevent draging and past in answer bar
    document.addEventListener('dragstart', event => { event.preventDefault(); });
    this.answerInput.addEventListener('paste', event => { event.preventDefault(); });

    // True when the content editable is disabled (but focus is keep for mobile devices)
    this.answerInputDisable = false;

    // Event when the answer input has changed
    this.onInputCallback = () => { };
    this.answerInput.addEventListener("input", (event) => {

      // Do not process if this is a composition
      if (event.isComposing) return;

      // Run the callback function
      this.onInputCallback(this.getAnswerText());
    });

    // Get the correction bar
    this.correction = document.getElementById("correction");

    // On composition end, run the callback event
    this.answerInput.addEventListener("compositionend", () => { this.onInputCallback(this.getAnswerText()); });

    // Callback function and event when the user press Enter key
    this.onEnterCallback = () => { };
    this.answerInput.addEventListener("keydown", (event) => {

      // If the input is disabled, prevent adding characters in the input field
      if (this.answerInputDisable) {
        event.preventDefault();
        return;
      }

      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {

        // Run the callback function
        this.onEnterCallback(this.answerInput.innerText);

        // Cancel the default action (no enter in the answer input)
        event.preventDefault();
      }
    });




    // When the submit button is clicked, run the callback function as if the user pressed Enter
    this.submitBtn = document.getElementById("answer-submit-btn");
    this.submitBtn.addEventListener("click", (event) => {
      // If the answer bar is disable, do not run callback
      if (this.answerInputDisable) {
        event.preventDefault();
        return;
      }

      this.onEnterCallback(this.answerInput.innerText);
    })
  }


  /**
   * Clear input field
   */
  clearInput() {
    this.answerInput.innerHTML = "";
  }


  /**
   * Set the callback function when the answer input change
   * @param {function} callback Callback function called when the input change
   */
  onInput(callback) {
    this.onInputCallback = callback;
  }


  /**
   * Set the callback function when the Enter key is pressed in the answer input
   * @param {function} callback Callback function called when the user press enter
   */
  onEnter(callback) {
    this.onEnterCallback = callback;
  }


  getAnswerText() {
    return this.answerInput.innerText;
  }


  /**
   * Disable the answer input (and the submit button)
   */
  disableInput() {
    this.answerInputDisable = true;
    this.answerInput.classList.add("disable");
    this.submitBtn.classList.add("disable");

  }

  /**
   * Enable the answer input (and the submit button)
   */
  enableInput() {
    this.answerInputDisable = false;
    this.answerInput.classList.remove("disable");
    this.submitBtn.classList.remove("disable");
  }


  /**
   * Set the prompt to the answer input
   * When the prompt is updated, focus on the answer bar
   * @param {string} prompt The prompt to display in the answer input
   */
  setPrompt(prompt) {
    this.answerInput.setAttribute("placeholder", prompt);
  }


  /**
   * Set focus to the answer bar
   */
  focus() {
    // Set focus on the answer bar at start up
    this.answerInput.focus();
  }

}


