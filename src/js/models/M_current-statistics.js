import settings from "Js/controllers/C_settings.js";



class M_CurrentStatistics {

  // Constructor, perform initializations
  constructor() {
    this.results = {};
  }


  /**
   * Compute the statistics for the current memory test
   * @param {array} answersStats Array contaning the statistics for each question
   * @returns The global stats for the current memory test, with the averages
   */
  processCurrentStatistics(answersStats) {
    
    // Compute the average ratios
    this.results.score = 0;
    this.results.distance = 0;
    this.results.maxDistance = 0;
    this.results.ratioWpm = 0;
    let cumulatedTime = 0;
    let cumulatedKeys = 0;

    // Sum for each questions
    answersStats.forEach(answer => {
      this.results.score += answer.answerScore;
      this.results.distance += answer.ratioDistance;
      this.results.maxDistance += answer.ratioMaxDistance;
      this.results.ratioWpm += answer.ratioWpm;
      cumulatedTime += answer.time;
      cumulatedKeys += answer.answered.trim().length + 1;
    });

    // Normalize the sums to get the average
    this.results.score /= answersStats.length;
    this.results.distance /= answersStats.length;
    this.results.maxDistance /= answersStats.length;
    this.results.ratioWpm /= answersStats.length;
    this.results.wpm = 12000 * (cumulatedKeys) / cumulatedTime;
    this.results.duration = settings.get('timerValue');
    
    // Append the answer's statistics to get a unique object
    this.results.answersStats = answersStats;

    // Return the processed results
    return {...this.results};    
  }



}

export default new M_CurrentStatistics();