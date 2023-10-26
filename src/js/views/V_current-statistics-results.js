
import "Assets/css/current-statistics-results.css";
import colors from "Js/views/V_colors.js";
import PieChart from "Js/views/V_pie-chart.js";
import * as bootstrap from "bootstrap";
import { easeOutQuadProgress } from "Js/lib/ease.js";

export default class V_CurrentStatisticsResults {


  /**
   * Constructor, get and initialize the element
   */
  constructor() {

    // Get the modal elements
    this.resultsModalEl = document.getElementById("results-modal");
    this.resultsModal = new bootstrap.Modal('#results-modal', { 'focus': true });

    // Set the callback function when the modal is shown
    this.resultsModalEl.addEventListener('show.bs.modal', () => { this.onModalShow(); });
    this.resultsModalEl.addEventListener('shown.bs.modal', () => { this.onModalShown(); });

    // Get the score value element
    this.resultsScoreEl = this.resultsModalEl.querySelector("#results-score .value");

    // Get the progress value element
    this.resultsProgressEl = this.resultsModalEl.querySelector("#results-progress .value");

    // Initialize the pie chart for the score
    this.pieScoreEl = this.resultsModalEl.querySelector("#results-pie-score");
    this.pieScore = new PieChart(this.pieScoreEl);
    this.pieScore.setColors(colors.red, colors.lightGrey);
    this.pieScore.setLabels('Overall Score', 'Room For Progress');

    // Initialize the pie chart for the correct answers
    this.pieCorrectEl = this.resultsModalEl.querySelector("#results-pie-correct");
    this.pieCorrect = new PieChart(this.pieCorrectEl);
    this.pieCorrect.setColors(colors.green, colors.lightGrey);
    this.pieCorrect.setLabels('Correct answers', 'Room For Progress');

    // Initialize the pie chart for the accuracy
    this.pieAccuracyEl = this.resultsModalEl.querySelector("#results-pie-accuracy");
    this.pieAccuracy = new PieChart(this.pieAccuracyEl);
    this.pieAccuracy.setColors(colors.orange, colors.lightGrey);
    this.pieAccuracy.setLabels('Accuracy', 'Room For Progress');

    // Initialize the pie chart for the wpm
    this.pieWpmEl = this.resultsModalEl.querySelector("#results-pie-wpm");
    this.pieWpm = new PieChart(this.pieWpmEl);
    this.pieWpm.setColors(colors.blue, colors.lightGrey);
    this.pieWpm.setLabels('Words per minute', 'Room For Progress');
  }


  /**
   * Prepare the new results for future display in the modal
   * @param {object} data The statistics of the current memory test
   */
  setNewResults(data) {
    this.results = data;
  }

  /**
   * Show the modal
   */
  showModal() {
    return new Promise((resolve) => {

      // Show the modal
      this.resultsModal.show();

      // Add an event listener to resolve the promise when the modal is closed
      this.resultsModalEl.addEventListener('hidden.bs.modal', () => { 
        resolve();
      }, {once: true}); 
    })
  }


  /**
   * When the show instance is called, reset the modal content to run the animations
   */
  onModalShow() {

    // Reset score and progress
    this.resultsScoreEl.innerText = 0;
    this.resultsProgressEl.innerText = 0;

    // Reset memory score pie chart
    this.pieScore.disableAnimation();
    this.pieScore.setRatio(0);

    // Reset right answers pie chart
    this.pieCorrect.disableAnimation();
    this.pieCorrect.setRatio(0);

    // Reset accuracy pie chart
    this.pieAccuracy.disableAnimation();
    this.pieAccuracy.setRatio(0);

    // Reset wpm pie chart
    this.pieWpm.disableAnimation();
    this.pieWpm.setRatio(0);
  }


  /**
   * Callback function called when the modal is shown
   * Lauch the animation
   */
  onModalShown() {

    setTimeout(() => {

      // Update the score and progress
      easeOutQuadProgress(this.resultsScoreEl, 0, this.results.score)
      easeOutQuadProgress(this.resultsProgressEl, 0, 100 * this.results.progress, (this.results.progress >= 0.1) ? 1 : 2, true)

      // Update memory score pie chart
      this.pieScore.enableAnimation();
      this.pieScore.setRatio(this.results.scoreRatio);

      // Update right answers pie chart
      this.pieCorrect.enableAnimation();
      this.pieCorrect.setRatio(this.results.distance);

      // Update accuracy pie chart
      this.pieAccuracy.enableAnimation();
      this.pieAccuracy.setRatio(this.results.maxDistance);

      // Update wpm pie chart
      this.pieWpm.enableAnimation();
      this.pieWpm.setRatio(this.results.ratioWpm, 0, this.results.wpm);
    }, 250);
  }



}




