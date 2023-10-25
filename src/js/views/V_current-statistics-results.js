
import "Assets/css/current-statistics-results.css";
import colors from "Js/views/V_colors.js";
import PieChart from "Js/views/V_pie-chart.js";
import * as bootstrap from "bootstrap";


export default class V_CurrentStatisticsResults {

  /**
   * Constructor, get and initialize the element
   */
  constructor() {

    // Get the modal elements
    this.resultsModalEl = document.getElementById("results-modal");
    this.resultsModal = new bootstrap.Modal('#results-modal', { 'focus': false });

    // Initialize the pie chart for the score
    this.pieScoreEl = this.resultsModalEl.querySelector("#results-pie-score");
    this.pieScore = new PieChart(this.pieScoreEl);
    this.pieScore.setColors(colors.red, colors.lightGrey);
    this.pieScore.setLabels('Overall Score', 'Room For Progress');
  }




  populateResultsModal(data) {
    console.log(data)

  }


  showModal() {

    this.resultsModal.show();



  }

}




