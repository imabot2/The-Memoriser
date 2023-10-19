
import view from "Js/views/V_statistics.js";


class C_Statistics {

  constructor() {
  }



  push(data) {


    // Compute WPM
    data.wpm = 12000 * (data.answered.length) / data.time;

    // Comptute ratios
    data.ratioMaxDistance = Math.max( 1- (data.maxDistance/data.expected.length), 0);
    data.ratioDistance = Math.max( 1- (data.distance/data.expected.length), 0);
    data.ratioWpm = 1 - Math.exp(-0.1*data.wpm);

    // Compute the global score
    data.score = data.ratioDistance * data.ratioMaxDistance * data.ratioWpm;

    if (data.distance)
      view.showFailedCard(data.score*100, data.time, data.wpm);
    else
      view.showSuccessCard(data.score*100, data.time, data.wpm);
  }
}



export default new C_Statistics();