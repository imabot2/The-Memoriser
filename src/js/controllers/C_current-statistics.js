
import view from "Js/views/V_current-statistics.js";
import model from "Js/models/M_current-statistics.js";


class C_currentStatistics {

  // Constructor, perform initializations
  constructor() {

    // Statisticss of the current memory test
    this.answersStats = [];

    this.answersStats = [{"maxDistance":1,"time":3928,"expected":"XK","answered":"xk ","path":"/iso/country-code/europe/","uid":"xk","count":0,"distance":0,"image":"/images/aa206a3e3174ee410ea3c789d31118d8-kosovo.png","flag":"/static/circle-flags/iso.svg","wpm":9.164969450101832,"ratioMaxDistance":0.5,"ratioDistance":1,"ratioWpm":0.6000824767502244,"answerScore":0.7350082476750225,"previousScore":0,"newScore":0.7350082476750225},{"maxDistance":0,"time":2258,"expected":"GR","answered":"gr ","path":"/iso/country-code/europe/","uid":"gr","count":0,"distance":0,"image":"/images/d3f839429022ecf7cf0ab3495d8de240-greece.png","flag":"/static/circle-flags/iso.svg","wpm":15.943312666076174,"ratioMaxDistance":1,"ratioDistance":1,"ratioWpm":0.7969557344079434,"answerScore":0.9796955734407944,"previousScore":0,"newScore":0.9796955734407944},{"maxDistance":0,"time":1410,"expected":"ES","answered":"es ","path":"/iso/country-code/europe/","uid":"es","count":0,"distance":0,"image":"/images/1df75492e0d25d51e58c5c032604a3c9-spain.png","flag":"/static/circle-flags/iso.svg","wpm":25.53191489361702,"ratioMaxDistance":1,"ratioDistance":1,"ratioWpm":0.9221671335734546,"answerScore":0.9922167133573455,"previousScore":0,"newScore":0.9922167133573455},{"maxDistance":0,"time":1530,"expected":"IE","answered":"ie ","path":"/iso/country-code/europe/","uid":"ie","count":0,"distance":0,"image":"/images/549f1b1249bedfedc5da05ab09b59380-ireland.png","flag":"/static/circle-flags/iso.svg","wpm":23.529411764705884,"ratioMaxDistance":1,"ratioDistance":1,"ratioWpm":0.9049109232281132,"answerScore":0.9904910923228114,"previousScore":0,"newScore":0.9904910923228114},{"maxDistance":0,"time":4664,"expected":"LV","answered":"lv ","path":"/iso/country-code/europe/","uid":"lv","count":0,"distance":0,"image":"/images/c1de39501b84bbb391a3b012f0b85603-latvia.png","flag":"/static/circle-flags/iso.svg","wpm":7.718696397941681,"ratioMaxDistance":1,"ratioDistance":1,"ratioWpm":0.5378517906072513,"answerScore":0.9537851790607251,"previousScore":0,"newScore":0.9537851790607251},{"maxDistance":0,"time":1934,"expected":"BA","answered":"ba ","path":"/iso/country-code/europe/","uid":"ba","count":1,"distance":0,"image":"/images/d60eaf1eafe9603a46ed62695ecf4033-bosnia-and-herzegovina.png","flag":"/static/circle-flags/iso.svg","wpm":18.61427094105481,"ratioMaxDistance":1,"ratioDistance":1,"ratioWpm":0.8445493706793153,"answerScore":0.9844549370679315,"previousScore":0.9776033625362565,"newScore":0.981029149802094},{"maxDistance":2,"time":6358,"expected":"Sudan","answered":"Sudan ","path":"/en/geography/africa/","uid":"sd","count":5,"distance":0,"image":"/images/b3ec3fc731c80f4ca7b47bf2fd0a8baa-sudan.png","flag":"/static/circle-flags/gb.svg","wpm":11.324315822585719,"ratioMaxDistance":0.6,"ratioDistance":1,"ratioWpm":0.6777512713045919,"answerScore":0.7877751271304592,"previousScore":0.9948059663501458,"newScore":0.9603008264801981},{"maxDistance":0,"time":1971,"expected":"CY","answered":"cy ","path":"/iso/country-code/europe/","uid":"cy","count":1,"distance":0,"image":"/images/614aebf847ff6cfcfbd9dbb9a21bf598-cyprus.png","flag":"/static/circle-flags/iso.svg","wpm":18.264840182648403,"ratioMaxDistance":1,"ratioDistance":1,"ratioWpm":0.839021428360879,"answerScore":0.9839021428360879,"previousScore":0.9853993590392256,"newScore":0.9846507509376567}];

  }

  
  showResults() {
    model.processCurrentStatistics(this.answersStats);

    view.populateResultsModal(this.answersStats);
    
    view.showModal();
    //console.log(this.answersStats);
    //console.log(JSON.stringify(this.answersStats));

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



export default new C_currentStatistics();