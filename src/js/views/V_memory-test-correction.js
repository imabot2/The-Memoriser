
/**
 * Manage the answer bar view (answer bar, flag, submit button...)
 */
export default class  V_memoryTestCorrection {

  constructor() {
    
    // Get the correction bar
    this.correction = document.getElementById("correction");    
  }


  hideCorrection() {
    this.correction.style.opacity = "0";
  }

  showCorrection() {
    this.correction.style.removeProperty("opacity");
  }

  showAnswer(answer) {
    this.correction.innerHTML = `<span class="expectedAnswer">${answer}</span>`;
  }

  /**
   * Set new HTML content in the answer input
   * @param {string} html HTML code to place in the input bar
   */
  setCorrectionHTML(html) {
    this.correction.innerHTML = html;
  }

}


