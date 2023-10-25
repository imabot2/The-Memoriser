
class M_CurrentStatistics {

  // Constructor, perform initializations
  constructor() {
    this.results = {
      averageScore: 0
    }

  }



  processCurrentStatistics(answersStats) {
    
    this.results.score = 0;
    this.results.distance = 0;
    this.results.maxDistance = 0;

    answersStats.forEach(answer => {
      this.results.score += answer.answerScore;
      this.results.distance += answer.ratioDistance;
      this.results.maxDistance += answer.ratioMaxDistance;
    });
    this.results.score /= answersStats.length;
    this.results.distance /= answersStats.length;
    this.results.maxDistance /= answersStats.length;
    
    
    console.log (this.results)


    
  }
}

export default new M_CurrentStatistics();