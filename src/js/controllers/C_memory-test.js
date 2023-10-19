import model from "Js/models/M_memory-test.js";
import view from "Js/views/V_memory-test.js";
import timer from "Js/controllers/C_timer.js";
import Levenshtein from "Js/lib/levenshtein.js";


class C_MemoryTest {

  constructor() {
    // Set callback functions when the user press Enter or the submit button
    view.onInput((text) => this.onInputChange(text));
    view.onEnter((text) => this.onEnterPressed(text));


    // Set the callback function when the time is over
    timer.onOver(() => { this.onTimeOver(); });

    // Current status of the memory test is in pause
    this.status = "pause";

    // Prepare the Levenshtein library options
    this.levenshtein = new Levenshtein();
    this.levenshtein.setOptions({
      trim: true,
      removeExtraSpaces: true,
      ignoreHyphens: true,
      caseSensitive: false,
      ignoreAccents: true,
      appendSpaces: true,
    });
   
  }



  /**
   * Callback function called when the answer input changes
   */
  onInputChange(input) {

    // If the timer is on pause, start and display the timer
    if (this.status === "pause") {
      this.status = "running";
      timer.start();
      timer.show();
    }

    // Sanitize input (Remove extra spaces)
    let sanitized = input
      .trim()                   // Trim
      .replace(/\s*-\s*/, "-")  // Remove spaces around hyphens
      .replace(/\s+/g, " ");    // Remove extra spaces


    // Compute the Levenshtein distance
    let distance = this.levenshtein.distance(sanitized, this.current.answer);

    // Check the answer (user pressed space at the end of the right answer)
    if (input[input.length - 1] === " " && !distance) {
      //alert(distance + " "+ sanitized+" "+ this.current.answer)
      this.nextQuestion();
      view.clearInput();
      return;
    }

    // Compute the Levenshtein distance    
    let len = Math.min(sanitized.length, this.current.answer.length);
    distance = this.levenshtein.distance(sanitized, this.current.answer.slice(0, len));

    // Set the correction if the distance is higher than zero
    if (distance) {
      // Show the correction if the Levenshtein distance is not null
      let html = this.levenshtein.getHTML();
      html += `<span class="extra insert">${this.current.answer.slice(len)}</span>`;
      view.setCorrectionHTML(html);
    }
    else
      view.setCorrectionHTML("");
  }



  /**
  * Callback function called when Enter key is pressed
  */
  onEnterPressed(text) {

    view.focus();
    // Compute the Levenshtein distance
    let distance = this.levenshtein.distance(text, this.current.answer);

    if (distance == 0) {

      // This is the right answer
      this.nextQuestion();
      view.clearInput();
    }
    else {

      // This is not the right answer, update the correction and disable input 
      view.setCorrectionHTML("");
      view.setExpectedAnswer(this.current.answer);
      view.disableInput();
      
      // Hide the answer after a delay
      setTimeout(() => {
        view.hideExpectedAnswer();
      }, 800)

      // Go to next question when the expected answer is hidden
      setTimeout(() => {
        this.nextQuestion();
        view.clearInput();
        view.enableInput();
      }, 1000)
    }
  }



  /**
   * Callback function called when the test is over
   */
  onTimeOver() {
    this.status = "over";
    view.disableInput();
  }






  /**
   * Reset the memory test
  */
  reset() {
    // Get and display the first question
    this.current = model.getNextQuestion();
    view.setNextImage(this.current.image, 0);
    view.setPrompt(this.current.prompt);
    view.setLanguageFlag(this.current.flag);
    view.shownNextQuestion();

    // Get and prepare the next question
    this.next = model.getNextQuestion();
    view.setNextImage(this.next.image, 0);
  }


  /**
   * Prepare the next question and put image
   */
  prepareNextQuestion() {
    // Get and prepare the next question
    this.next = model.getNextQuestion();
    view.setNextImage(this.next.image);
  }


  /**
   * Pick the next question and switch questions on screen
   */
  nextQuestion() {
    // Pick the next question
    this.current = this.next;

    // Show the next question
    view.shownNextQuestion();

    // Prepare prompt and remove correction
    view.setPrompt(this.current.prompt);
    view.setCorrectionHTML("");
    view.setLanguageFlag(this.current.flag);

    // Prepare the next question
    this.prepareNextQuestion();
  }


  /**
   * Add a new quiz in the list
   * @param {string} path Path to the new quiz
   */
  addQuiz(path) { return model.addQuiz(path); }


  /**
   * Remove a quiz from the list
   * @param {string} path Path to the quiz to remove
   */
  removeQuiz(path) { return model.removeQuiz(path); }



}


export default new C_MemoryTest();