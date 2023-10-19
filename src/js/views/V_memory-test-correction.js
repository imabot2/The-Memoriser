import "Assets/css/memory-test-correction.css";


/**
 * Manage the answer bar view (answer bar, flag, submit button...)
 */
export default class V_memoryTestCorrection {

  /**
   * Constructor, initialize the correction and the expected answer bar
   */
  constructor() {

    // Get the correction bar
    this.correction = document.getElementById("correction");

    // Get the bar with the expected answer
    this.expectedAnswer = document.getElementById("expected-answer");

    // Remove th display none class (to prevent answer bar from displaying at startup)
    this.expectedAnswer.classList.remove("d-none");
  }



  /**
   * Hide the correction (set empty content)
   */
  hideCorrection() {
    this.setCorrectionHTML("");
  }


  /**
   * Set new HTML content in the answer input
   * If the content is empty, the correction bar is hidden
   * @param {string} html HTML code to place in the input bar
   */
  setCorrectionHTML(html) {
    // Set the correction and replace space with non breakable space    
    this.correction.innerHTML = html;    
  }


  /**
   * Hide the expected answer
   */
  hideExpectedAnswer() {
    this.expectedAnswer.classList.add("hide");
  }


  /**
   * Set and show the expected answer
   * @param {string} html The HTML content of the answer bar
   */
  setExpectedAnswer(html) {
    // Set the expected answer and replace space with non breakable space
    this.expectedAnswer.innerHTML = html.replace(" ", "&nbsp;");
    this.expectedAnswer.classList.remove("hide");
  }


}


