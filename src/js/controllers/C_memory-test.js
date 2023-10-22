import model from "Js/models/M_memory-test.js";
import view from "Js/views/V_memory-test.js";
import timer from "Js/controllers/C_timer.js";
import Levenshtein from "Js/lib/levenshtein.js";
import statistics from "Js/controllers/C_statistics.js";
import Timer from "Js/lib/timer.js"


class C_MemoryTest {

  constructor() {
    // Set callback functions when the user press Enter or the submit button
    view.onInput((text) => this.onInputChange(text));
    view.onEnter((text) => this.onEnterPressed(text));

    // Initialize stats for the current question
    this.currentStats = {};
    this.currentStats.maxDistance = 0;

    // Set the callback function when the time is over
    timer.onOver(() => { this.onTimeOver(); });

    // Current status of the memory test is in pause
    this.status = "ready";

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

    // Initialize the timer used for each question
    this.questionTimer = new Timer();

  }


  /**
   * Reset the memory test
  */
  reset() {
    return new Promise((resolve) => {
      // Get and display the first question
      this.current = model.getNextQuestion();
      let imageOnePromise = view.setNextImage(this.current.image, 0);
      view.setPrompt(this.current.prompt);
      view.setCurrentFlag(this.current.metaData.flag)
      view.shownNextQuestion();

      // Get and prepare the next question
      this.next = model.getNextQuestion();
      let imageTwoPromise = view.setNextImage(this.next.image, 0);
      view.setNextFlag(this.next.metaData.flag)


      // When all image are loaded, resolve the promise
      Promise.all([imageOnePromise, imageTwoPromise]).finally(() => {
        resolve();
      })
    })
  }



  /**
   * Callback function called when the answer input changes
   */
  onInputChange(input) {

    // If the timer is on pause, start and display the timers
    if (this.status === "ready") {

      this.status = "running";
      timer.start();
      timer.show();
      this.questionTimer.init(0, "up");
      this.questionTimer.start();
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

      // Process the current question for statistics
      this.processQuestionOver(0);

      // Switch to the next question
      this.nextQuestion();
      view.clearInput();
      return;
    }

    // Compute the Levenshtein distance    
    let len = Math.min(sanitized.length, this.current.answer.length);
    distance = this.levenshtein.distance(sanitized, this.current.answer.slice(0, len));

    // Store the max distance
    this.currentStats.maxDistance = Math.max(this.currentStats.maxDistance, distance);


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
  onEnterPressed(input) {

    view.focus();

    // If the timer is on pause, start and display the timers
    if (this.status === "ready") {

      this.status = "running";
      timer.start();
      timer.show();
      this.questionTimer.init(0, "up");
      this.questionTimer.start();
      return;
    }


    // Compute the Levenshtein distance
    let distance = this.levenshtein.distance(input, this.current.answer);

    // Store the max distance
    this.currentStats.maxDistance = Math.max(this.currentStats.maxDistance, distance);

    // Process the current question for statistics
    this.processQuestionOver(distance);


    if (distance == 0) {

      // This is the right answer
      this.nextQuestion();
      view.clearInput();
    }
    else {

      // This is not the right answer, show the expected answer      
      view.setExpectedAnswer(this.current.answer)
        .then(() => { this.nextQuestion(); });
    }
  }

  /**
   * Process the current question statistics
   */
  processQuestionOver(distance) {

    // Prepare the statistics
    this.currentStats.time = this.questionTimer.getTime().raw;
    this.currentStats.expected = this.current.answer;
    this.currentStats.answered = view.getAnswerText();
    this.currentStats.path = this.current.path;
    this.currentStats.uid = this.current.uid;
    this.currentStats.distance = distance;

    // Push and update the statistics
    this.currentStats = statistics.push({ ...this.currentStats });
    model.update({ ...this.currentStats });
  }



  /**
   * Callback function called when the test is over
   */
  onTimeOver() {
    this.status = "over";
    view.disableInput();
  }









  /**
   * Prepare the next question and put image
   */
  prepareNextQuestion() {
    // Get and prepare the next question
    this.next = model.getNextQuestion();
    view.setNextImage(this.next.image);
    view.setNextFlag(this.next.metaData.flag);
  }


  /**
   * Pick the next question and switch questions on screen
   */
  nextQuestion() {
    // Pick the next question
    this.current = this.next;

    // Hide the correction
    view.setCorrectionHTML("");

    // Reset maxDistance
    this.currentStats.maxDistance = 0;

    // Show the next question
    view.shownNextQuestion();

    // Prepare prompt (and remove correction)
    view.setPrompt(this.current.prompt);

    // Update the card and show if changes occured
    view.showNextFlag();

    // Prepare the next question
    this.prepareNextQuestion();

    // Start the timer
    this.questionTimer.init(0, "up");
    this.questionTimer.start();
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