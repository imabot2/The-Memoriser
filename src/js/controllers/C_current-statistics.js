
import view from "Js/views/V_current-statistics.js";


class C_Statistics {

  // Constructor, perform initializations
  constructor() {
    
    // Statisticss of the current memory test
    this.answersStats = [];
  }


  showResults() {
    console.log (this.answersStats);
  }


  /**
   * Add a set of data related to a question is 
   * @param {object} qStat the data related to the current question
   */
  push(qStat) {
    
    // Display the success or failed card according to the final distance
    if (qStat.distance)
      view.showFailedCard(qStat.lastQuestionScore * 100, qStat.time, qStat.wpm);
    else
      view.showSuccessCard(qStat.lastQuestionScore * 100, qStat.time, qStat.wpm);

    // Append questions statistics to the global stats
    this.answersStats.push(qStat);

   
    // Return the upgrading question statistics
    return qStat;
  }



}



export default new C_Statistics();