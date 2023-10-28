import model from "Js/models/M_memory-test.js";
import view from "Js/views/V_memory-test.js";
import timer from "Js/controllers/C_timer.js";
import Levenshtein from "Js/lib/levenshtein.js";
import currentStatistics from "Js/controllers/C_current-statistics.js";
import Timer from "Js/lib/timer.js"
import auth from "Js/models/M_auth.js";
import notifications from "Js/views/V_notifications";
import { isMobile } from "Js/lib/client.js";
import analytics from "Js/models/M_analytics.js";
import loader from "Js/views/V_main.js";

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
    this.levenshteinTruncated = new Levenshtein();
    this.levenshtein = new Levenshtein();

    let options = {
      trim: true,
      removeExtraSpaces: true,
      ignoreHyphens: true,
      caseSensitive: false,
      ignoreAccents: true,
      appendSpaces: true,
    }

    this.levenshteinTruncated.setOptions(options);
    this.levenshtein.setOptions(options);

    // Initialize the timer used for each question
    this.questionTimer = new Timer();
  }


  model() {
    return model;
  }

  /**
   * Reset the memory test
   * - Check if the questions and statistics are equal
  */
  reset() {

    // Current status of the memory test during reset
    this.status = "reset";

    // Clear and disable the input
    view.clearInput();
    view.disableInput();

    // Hide the timer
    timer.hide();

    return new Promise((resolve, reject) => {

      // Check if the memory test is not empty
      if (model.countQuestions() == 0) { reject("No question in the memory test."); return; }

      // #DEBUG FOR DEBUGGING MEMORY TEST
      if (model.countQuestions() != model.countStatistics()) {

        // The number of statistics is not the same as the number of questions
        console.warn(`Number of statistics is not equal to number of questions (${model.countQuestions()} vs ${model.countStatistics()}). Two questions with the same ID?`);

        // Display the questions with the same Path / UID
        model.getPaths().forEach((path) => {
          let uids = model.getUidList(path);
          uids.forEach((uid) => {
            let count = uids.filter(u => u === uid).length;
            if (count !== 1) console.warn(path, uid, count);
          })
        })
      }

      // Reset statistics
      currentStatistics.reset();

      // Get and display the first question
      this.current = model.getNextQuestion();
      let imageOnePromise = view.setNextImage(this.current.image, 0);
      view.setPrompt(this.current.prompt);
      view.setCurrentFlag(this.current.metaData.flag)
      view.shownNextQuestion();

      // Get and prepare the next question
      this.next = model.getNextQuestion();
      let imageTwoPromise = view.setNextImage(this.next.image, 0);
      view.setNextFlag(this.next.metaData.flag);

      // When all images are loaded, resolve the promise
      Promise.all([imageOnePromise, imageTwoPromise]).finally(() => {

        // Reset the timer
        timer.reset();

        // Memory test is ready
        this.status = "ready";
        resolve();
      })
    })
  }


  /**
   * Start the memory test, enable input and set focus on the input bar
   */
  start() {
    view.enableInput();

    // If user is not on mobile device, set focus to the answer input
    // On mobile device, do not focus to prevent soft keyboard from opening
    if (!isMobile()) document.getElementById('answer-input').focus();
  }


  /**
   * Callback function called when the answer input changes
   */
  onInputChange(input) {

    // If the timer is on pause, start and display the timers
    if (this.status === "ready") {

      this.status = "running";
      analytics.log("Start memory test", model.getPaths());
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

    // Compute the Levenshtein distance for checking the answer
    // The distanceCheck must be calculated BEFORE the truncated distance 
    // Because the Levenstein class is reused with getHTML
    let distanceCheck = this.levenshtein.distance(sanitized, this.current.answer);

    // Check the answer (user pressed space at the end of the right answer)
    if (input[input.length - 1] === " ") {

      // If this is the right answer 
      // or if f the current score if less than 0.8 and the answer is higher than the answer
      // process the answer
      if ((this.current.score >= 0.8 && sanitized.length >= this.current.answer.length) || !distanceCheck) {

        // Process the current question for statistics
        this.processQuestionOver(distanceCheck);
        return;
      }
    }


    // Compute the Levenshtein distance and store the distance max
    let len = Math.min(sanitized.length, this.current.answer.length);
    //if (sanitized.length > this.current.answer.length)
    //      len = sanitized.length;

    let distance = this.levenshteinTruncated.distance(sanitized.slice(0, len), this.current.answer.slice(0, len));
    this.currentStats.maxDistance = Math.max(this.currentStats.maxDistance, distance);


    // Set the correction if the distance is higher than zero or the user answer is longer than the expected answer
    // And the score is not higher than 0.8
    if ((distance || sanitized.length>this.current.answer.length) && (this.current.score < 0.8 || this.questionTimer.getTime().raw > 10000)) {
      // Show the correction if the Levenshtein distance is not null
      let html = this.levenshteinTruncated.getHTML();
      html += `<span class="extra insert">${this.current.answer.slice(len)}</span>`;

      // If the answer is longer than the expected answer, add deleted extra characters
      if (sanitized.length > this.current.answer.length)
        html += `<span class="delete">${sanitized.slice(len)}</span>`;

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
      analytics.log("Start memory test", model.getPaths());
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



  }





  /**
   * Process the current question statistics
   * Call every time a question is over (success of failed)
   */
  processQuestionOver(distance) {

    // Prepare the statistics
    this.currentStats.time = this.questionTimer.getTime().raw;
    this.currentStats.expected = this.current.answer;
    this.currentStats.answered = view.getAnswerText();
    this.currentStats.path = this.current.path;
    this.currentStats.uid = this.current.uid;
    this.currentStats.count = this.current.count;
    this.currentStats.distance = distance;
    this.currentStats.image = this.current.image;
    this.currentStats.flag = this.current.metaData.flag;

    // Compute WPM, 
    this.computeWpm(this.currentStats);
    this.computeRatio(this.currentStats);
    this.computeScore(this.currentStats);

    // Update global stats to get the new and previous scores
    let scores = model.update(this.currentStats.path, this.currentStats.uid, this.currentStats.answerScore);
    this.currentStats.previousScore = scores.previousScore;
    this.currentStats.newScore = scores.newScore;
    this.currentStats.deltaScore = scores.newScore - scores.previousScore;

    // Push and update the statistics
    currentStatistics.push({ ...this.currentStats });


    // Check if this is the right answer
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
   * Compute Words per Minutes for the provided question
   * @param {object} qStat Statistics of the current question
   */
  computeWpm(qStat) {
    // Compute WPM
    // Length +1 to consider the spaces between words
    qStat.wpm = 12000 * (qStat.answered.trim().length + 1) / qStat.time;
  }


  /**
 * Compute ratios for the provided question (max distance, distance and wpm)
 * @param {object} qStat Statistics of the current question
 */

  computeRatio(qStat) {
    // Comptute ratios
    qStat.ratioMaxDistance = Math.max(1 - (qStat.maxDistance / qStat.expected.length), 0);
    qStat.ratioDistance = Math.max(1 - (qStat.distance / qStat.expected.length), 0);
    qStat.ratioWpm = 1 - Math.exp(-0.1 * qStat.wpm);
  }

  /**
   * Compute the score for the provided question
   * @param {object} qStat Statistics of the current question
   */
  computeScore(qStat) {
    // Compute the weighted global score for this question
    qStat.answerScore = 0.40 * qStat.ratioDistance + 0.40 * qStat.ratioMaxDistance + 0.2 * qStat.ratioWpm;
  }

  /**
   * Callback function called when the test is over
   */
  onTimeOver() {

    // Update status and disable input bar
    this.status = "over";

    // Disable the input 
    view.disableInput();
    view.clearInput();
    view.setCorrectionHTML("");


    // If the user didn't answer to any questions
    // show a notification and reset the test
    if (currentStatistics.countQuestionsAnswered() == 0) {
      notifications.info("What happened?", "You haven't answered any questions!?!?", 2500);
      setTimeout(() => {
        this.reset()
          .then(() => {
            view.enableInput();
            this.start();
          })
      }, 2500)
      return;
    }


    // Hide the timer, the test is over
    timer.hide();

    // Show the results on the screen    
    currentStatistics.showResults()
      .finally(() => {

        // When the modal is closed, reset the test and enable the view when the images are loaded
        this.reset()
          .then(() => {
            view.enableInput();
            this.start();
          })

      })
      .catch((error) => {
        notifications.error("Results Error", error);
      })


    // If the user is logged, save statistics in database
    if (auth.isLogged()) {
      model.saveStatistics()
        .then(() => {
          notifications.success("Results saved", "Your memory test results are saved.", 1000);
        })
        .catch((error) => {
          console.error(error);
          notifications.error("DB Error", "Error while saving statistics");
        })
    }
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
  addQuiz(path) {
    return model.addQuiz(path);
  }


  /**
   * Remove a quiz from the list
   * @param {string} path Path to the quiz to remove
   */
  removeQuiz(path) {
    
    // Do not remove quiz if there is only one
    if (model.countPaths() == 1) return false;

    // Remove the requested quizz
    model.removeQuiz(path);
  
    return true;
  }

  /**
   * Remove all quiz and replace with a single one
   * @param {string} path The new quiz to load
   */
  replaceAllQuiz(path) {
    return model.replaceAllQuiz(path);
  }


}


export default new C_MemoryTest();