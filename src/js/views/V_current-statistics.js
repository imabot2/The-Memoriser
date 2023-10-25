import "Assets/css/current-statistics.css";
import V_CurrentStatisticsResults from "Js/views/V_current-statistics-results.js";

class V_CurrentStatistics extends V_CurrentStatisticsResults {

  /**
   * Constructor, get and initialize the element
   */
  constructor() {
    // Call the parent constructor
    super();

    // Get the elements of the success card
    this.successContainer = document.getElementById("success-card");
    this.successScore = this.successContainer.querySelector(".score");
    this.successTime = this.successContainer.querySelector(".time");
    this.successWpm = this.successContainer.querySelector(".wpm");

    // Set the card width for the animation
    let width = this.successContainer.offsetWidth;
    this.successContainer.style.setProperty("--success-card-width", `${width}px`);


    // Get the elements of the failed card
    this.failedContainer = document.getElementById("failed-card");
    this.failedScore = this.failedContainer.querySelector(".score");
    this.failedTime = this.failedContainer.querySelector(".time");
    this.failedWpm = this.failedContainer.querySelector(".wpm");

    // Set the card width for the animation
    width = this.failedContainer.offsetWidth;
    this.failedContainer.style.setProperty("--failed-card-width", `${width}px`);
  
  }


  /**
   * Hide the success card
   */
  hideSuccessCard() {
    this.successContainer.classList.remove("show");
  }


  /**
   * Hide the failed card
   */
  hideFailedCard() {
    this.failedContainer.classList.remove("show");
  }


  /**
   * Show the success card.
   * The card is automaticaly hidden after a delay
   * @param {integer} score Score of the card
   * @param {integer} ms Delay to answer the question in milliseconds
   * @param {integer} wpm wordd per minute
   */
  showSuccessCard(score, ms, wpm) {

    // Set values in the card
    this.successScore.innerHTML = `<span>${Math.round(score)}</span>%`;
    this.successTime.innerHTML = this.timeToHTML(ms);
    this.successWpm.innerHTML = `<span>${Math.round(wpm)}</span>wpm`;

    // Show the card
    this.successContainer.classList.add("show");

    // Hide the card after 800 milliseconds
    setTimeout(() => {
      this.hideSuccessCard();
    }, 800)

  }

    /**
   * Show the failed card.
   * The card is automaticaly hidden after a delay
   * @param {integer} score Score of the card
   * @param {integer} ms Delay to answer the question in milliseconds
   * @param {integer} wpm wordd per minute
   */
  showFailedCard(score, ms, wpm) {

    // Set values in the card
    this.failedScore.innerHTML = `<span>${Math.round(score)}</span>%`;
    this.failedTime.innerHTML = this.timeToHTML(ms);
    this.failedWpm.innerHTML = `<span>${Math.round(wpm)}</span>wpm`;

    // Show the card
    this.failedContainer.classList.add("show");

    // Hide the card after 800 milliseconds
    setTimeout(() => {
      this.hideFailedCard();
    }, 800)

  }

  /**
   * Convert a time in milliseconds to human readable HTML
   * @param {integer} ms time to convert in milliseconds
   * @returns {string} A string containing the HTML with the time 
   */
  timeToHTML(ms) {

    // Less than 10s, display seconds with two digits
    if (ms < 10000) {
      return `<span>${(ms / 1000).toFixed(2)}</span>s`;
    }

    // Less than 60s, display seconds with one digit
    if (ms < 60000) {
      return `<span>${(ms / 1000).toFixed(1)}</span>s`;
    }

    // One minute or more, display minutes:seconds
    let seconds = Math.round(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor((seconds % 60));
    return `<span>${minutes}:${seconds.toString().padStart(2, "0")}<span>`;
  }


}




export default new V_CurrentStatistics();