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
    this.results.scoreRatio = 0;
    this.results.distance = 0;
    this.results.maxDistance = 0;
    this.results.ratioWpm = 0;
    this.results.progress = 0;
    let cumulatedTime = 0;
    let cumulatedKeys = 0;

    // Sum for each questions
    answersStats.forEach(answer => {
      this.results.scoreRatio += answer.answerScore;
      this.results.distance += answer.ratioDistance;
      this.results.maxDistance += answer.ratioMaxDistance;
      this.results.ratioWpm += answer.ratioWpm;
      this.results.progress += answer.newScore - answer.previousScore;
      cumulatedTime += answer.time;
      cumulatedKeys += answer.answered.trim().length + 1;
    });

    // Normalize the sums to get the average
    this.results.scoreRatio /= answersStats.length;
    this.results.distance /= answersStats.length;
    this.results.maxDistance /= answersStats.length;
    this.results.ratioWpm /= answersStats.length;
    this.results.progress /= answersStats.length;
    this.results.wpm = 12000 * (cumulatedKeys) / cumulatedTime;
    this.results.duration = settings.get('timerValue');
    this.results.score = this.results.wpm * (this.results.scoreRatio * this.results.maxDistance) * 100;

    // Append the answer's statistics to get a unique object
    this.results.answersStats = answersStats;

    // Return the processed results
    return {...this.results};    
  }



}

export default new M_CurrentStatistics();