import V_MemoryTestAnswerBar from "Js/views/V_memory-test-answer-bar.js";


export default class V_MemoryTestQuestions extends V_MemoryTestAnswerBar {

  constructor() {
    super();

    // Set transition delay
    this.transitionDelay = 250;
    document.querySelector(':root').style.setProperty("--question-transition-delay", `${this.transitionDelay}ms`);

    // Set current question 
    this.currentQuestionID = 0;

    // Get image elements
    this.question = [];
    this.question[0] = {};
    this.question[0].div = document.getElementById('question-0');
    this.question[0].img = document.querySelector('#question-0>img');
    this.question[1] = {};
    this.question[1].div = document.getElementById('question-1');
    this.question[1].img = document.querySelector('#question-1>img');
  }


  /**
   * Set the next question image with a delay (to prevent image changing during transition)
   * @param {string} imageSrc Path or URL of the next image
   * @param {*} delay Delay before setting the image 
   */
  setNextImage(imageSrc, delay) {
    // Store the ID of the next image to prevent ID change in the meantime
    let id = 1 - this.currentQuestionID;
    setTimeout(() => {
      this.question[id].img.src = imageSrc;
    }, delay ?? this.transitionDelay);
  }


  /**
   * Show the next question (swap questions)
   */
  shownNextQuestion() {
    // Hide the current image
    this.question[this.currentQuestionID].div.style.opacity = 0;
    // Update the index
    this.currentQuestionID = 1 - this.currentQuestionID;
    // Show the new image
    this.question[this.currentQuestionID].div.style.opacity = 1;
    // Set focus to the next question
    this.focus();

  }
}


