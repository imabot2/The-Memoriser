import "Assets/css/memory-test.css";
import V_MemoryTestQuestions from "Js/views/V_memory-test-questions.js";



/**
 * Manage the view for the memory test
 * - Questions
 */
class V_MemoryTest extends V_MemoryTestQuestions {

  constructor() {
    super();
  }

  /**
   * Display the expected answer for a given delay
   * - Disable the input
   * - Hide the correction
   * @param {integer} ms delay in milliseconds
   * @returns 
   */
  setExpectedAnswer(html, ms = 700) {
    
    return new Promise((resolve) => {

      // hide the correction and disable the input
      this.setCorrectionHTML("");
      this.disableInput();
      super.setExpectedAnswer(html);

      // Hide the answer after a delay
      setTimeout(() => {
        this.hideExpectedAnswer();
      }, ms)

      // Clear and enable input when the expected answer is hidden
      setTimeout(() => {        
        this.clearInput();
        this.enableInput();
        resolve();
      }, ms+250);
    });
  }

}


export default new V_MemoryTest();