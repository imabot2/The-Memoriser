
import view from "Js/views/V_statistics.js";


class C_Statistics {

  constructor() {
    this.stats = [];
  }




  /**
   * Add a set of data related to a question is 
   * @param {object} qStat the data related to the current question
   */
  push(qStat) {

    // Compute WPM
    qStat.wpm = 12000 * (qStat.answered.length) / qStat.time;

    // Comptute ratios
    qStat.ratioMaxDistance = Math.max(1 - (qStat.maxDistance / qStat.expected.length), 0);
    qStat.ratioDistance = Math.max(1 - (qStat.distance / qStat.expected.length), 0);
    qStat.ratioWpm = 1 - Math.exp(-0.1 * qStat.wpm);

    // Compute the global score
    qStat.score = qStat.ratioDistance * qStat.ratioMaxDistance * qStat.ratioWpm;

    // Display the success or failed card according to the final distance
    if (qStat.distance)
      view.showFailedCard(qStat.score * 100, qStat.time, qStat.wpm);
    else
      view.showSuccessCard(qStat.score * 100, qStat.time, qStat.wpm);

    // Append questions statistics to the global stats
    this.stats.push(qStat);
    console.log (this.stats);
  }



}



export default new C_Statistics();