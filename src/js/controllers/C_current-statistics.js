
import view from "Js/views/V_current-statistics.js";
import model from "Js/models/M_current-statistics.js";


class C_currentStatistics {

  // Constructor, perform initializations
  constructor() {

    // Reset the statistics
    this.reset();

  }


  /**
   * Reset the statistics of the current memory test
   */
  reset() {

    // Reset the statistics of the current memory test (no answers)
    this.answersStats = [];

  }


  /**
   * Show the result in the modal
   * - Prepare data
   * - Show the modal with the results
   * @returns A promise resolved when the modal is closed
   */
  showResults() {
    this.answersStats = [
      { "maxDistance": 0, "time": 1345, "expected": "Vatican", "answered": "vatican ", "path": "/fr/geographie/europe/", "uid": "va", "count": 0, "distance": 0, "image": "/images/9e10fc4e4155734c0bd9038238246bc2-vatican-city.png", "flag": "/static/circle-flags/fr.svg", "wpm": 71.37546468401487, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.999205300473151, "answerScore": 0.9999205300473151, "previousScore": 0, "newScore": 0.9999205300473151, "deltaScore": 0.9999205300473151 },
      { "maxDistance": 0, "time": 2343, "expected": "Malte", "answered": "malte ", "path": "/fr/geographie/europe/", "uid": "mt", "count": 0, "distance": 0, "image": "/images/5de437b76e6b27c83aa2dd1c4652706f-malta.png", "flag": "/static/circle-flags/fr.svg", "wpm": 30.729833546734955, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.953717129533604, "answerScore": 0.9953717129533605, "previousScore": 0, "newScore": 0.9953717129533605, "deltaScore": 0.9953717129533605 },
      { "maxDistance": 0, "time": 3376, "expected": "Islande", "answered": "islande ", "path": "/fr/geographie/europe/", "uid": "is", "count": 0, "distance": 0, "image": "/images/766b58cbd36ff164e388ce458527ad8d-iceland.png", "flag": "/static/circle-flags/fr.svg", "wpm": 28.436018957345972, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9417843986499995, "answerScore": 0.994178439865, "previousScore": 0, "newScore": 0.994178439865, "deltaScore": 0.994178439865 },
      { "maxDistance": 0, "time": 2533, "expected": "Belgique", "answered": "belgique ", "path": "/fr/geographie/europe/", "uid": "be", "count": 0, "distance": 0, "image": "/images/d8a4b8aa08d22b448ea0ddb150017989-belgium.png", "flag": "/static/circle-flags/fr.svg", "wpm": 42.63718910382945, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9859301196300478, "answerScore": 0.9985930119630049, "previousScore": 0, "newScore": 0.9985930119630049, "deltaScore": 0.9985930119630049 },
      { "maxDistance": 0, "time": 1734, "expected": "France", "answered": "france ", "path": "/fr/geographie/europe/", "uid": "fr", "count": 0, "distance": 0, "image": "/images/2f13b9c978670f094d0614d34bd2e7c8-france.png", "flag": "/static/circle-flags/fr.svg", "wpm": 48.44290657439446, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9921267997292722, "answerScore": 0.9992126799729273, "previousScore": 0, "newScore": 0.9992126799729273, "deltaScore": 0.9992126799729273 },
      { "maxDistance": 0, "time": 3524, "expected": "Estonie", "answered": "estonie ", "path": "/fr/geographie/europe/", "uid": "ee", "count": 0, "distance": 0, "image": "/images/8f3bccd84afab0ac5e51229c069ecbe6-estonia.png", "flag": "/static/circle-flags/fr.svg", "wpm": 27.241770715096482, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9343998352439207, "answerScore": 0.9934399835243921, "previousScore": 0, "newScore": 0.9934399835243921, "deltaScore": 0.9934399835243921 },
      { "maxDistance": 3, "time": 5660, "expected": "Lettonie", "answered": "lettonie ", "path": "/fr/geographie/europe/", "uid": "lv", "count": 0, "distance": 0, "image": "/images/c1de39501b84bbb391a3b012f0b85603-latvia.png", "flag": "/static/circle-flags/fr.svg", "wpm": 19.081272084805654, "ratioMaxDistance": 0.625, "ratioDistance": 1, "ratioWpm": 0.8516420298654098, "answerScore": 0.8164142029865409, "previousScore": 0, "newScore": 0.8164142029865409, "deltaScore": 0.8164142029865409 },
      { "maxDistance": 1, "time": 6564, "expected": "Hongrie", "answered": "hongrie ", "path": "/fr/geographie/europe/", "uid": "hu", "count": 0, "distance": 0, "image": "/images/733c79ebe0cacc63b0eab951fe54cd5d-hungary.png", "flag": "/static/circle-flags/fr.svg", "wpm": 14.625228519195613, "ratioMaxDistance": 0.8571428571428572, "ratioDistance": 1, "ratioWpm": 0.7683488845562534, "answerScore": 0.9125491741699111, "previousScore": 0, "newScore": 0.9125491741699111, "deltaScore": 0.9125491741699111 },
      { "maxDistance": 0, "time": 2324, "expected": "Russie", "answered": "russie ", "path": "/fr/geographie/europe/", "uid": "ru", "count": 0, "distance": 0, "image": "/images/551aff23bf47289a23cd73f2f7de2272-russia.png", "flag": "/static/circle-flags/fr.svg", "wpm": 36.144578313253014, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9730684773123118, "answerScore": 0.9973068477312312, "previousScore": 0, "newScore": 0.9973068477312312, "deltaScore": 0.9973068477312312 },
      { "maxDistance": 0, "time": 1426, "expected": "Portugal", "answered": "Portugal ", "path": "/fr/geographie/europe/", "uid": "pt", "count": 0, "distance": 0, "image": "/images/cce3d952f87523cc96c02cd039a71f59-portugal.png", "flag": "/static/circle-flags/fr.svg", "wpm": 75.73632538569424, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9994861774258454, "answerScore": 0.9999486177425846, "previousScore": 0, "newScore": 0.9999486177425846, "deltaScore": 0.9999486177425846 },
      { "maxDistance": 0, "time": 2299, "expected": "Belgique", "answered": "Belgique ", "path": "/fr/geographie/europe/", "uid": "be", "count": 0, "distance": 0, "image": "/images/d8a4b8aa08d22b448ea0ddb150017989-belgium.png", "flag": "/static/circle-flags/fr.svg", "wpm": 46.9769464984776, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.990883730912211, "answerScore": 0.9990883730912211, "previousScore": 0, "newScore": 0.9990883730912211, "deltaScore": 0.9990883730912211 },
      { "maxDistance": 0, "time": 3941, "expected": "Pays-Bas", "answered": "Pays-bas ", "path": "/fr/geographie/europe/", "uid": "nl", "count": 0, "distance": 0, "image": "/images/98d05f43bc885e724eb1e3534d7a1f4d-netherlands.png", "flag": "/static/circle-flags/fr.svg", "wpm": 27.404212128901293, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9354568452420221, "answerScore": 0.9935456845242022, "previousScore": 0, "newScore": 0.9935456845242022, "deltaScore": 0.9935456845242022 },
      { "maxDistance": 1, "time": 3270, "expected": "Danemark", "answered": "Danemark ", "path": "/fr/geographie/europe/", "uid": "dk", "count": 0, "distance": 0, "image": "/images/6ceae70b4b062f8c01d5f5b64ad8fd45-denmark.png", "flag": "/static/circle-flags/fr.svg", "wpm": 33.027522935779814, "ratioMaxDistance": 0.875, "ratioDistance": 1, "ratioWpm": 0.9632182063344, "answerScore": 0.94007182063344, "previousScore": 0, "newScore": 0.94007182063344, "deltaScore": 0.94007182063344 },
      { "maxDistance": 0, "time": 4846, "expected": "Biélorussie", "answered": "Biélorussie ", "path": "/fr/geographie/europe/", "uid": "by", "count": 0, "distance": 0, "image": "/images/3f15e6475aef205a4a7b5bba701fa41f-belarus.png", "flag": "/static/circle-flags/fr.svg", "wpm": 29.71522905489063, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9487747602988077, "answerScore": 0.9948774760298809, "previousScore": 0, "newScore": 0.9948774760298809, "deltaScore": 0.9948774760298809 },
      { "maxDistance": 0, "time": 4076, "expected": "Bulgarie", "answered": "Bulgarie ", "path": "/fr/geographie/europe/", "uid": "bg", "count": 0, "distance": 0, "image": "/images/9e72b8baaff361fa20b39c847d3818cd-bulgaria.png", "flag": "/static/circle-flags/fr.svg", "wpm": 26.49656526005888, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9293245159172379, "answerScore": 0.9929324515917238, "previousScore": 0, "newScore": 0.9929324515917238, "deltaScore": 0.9929324515917238 },
      { "maxDistance": 0, "time": 3356, "expected": "Lituanie", "answered": "Lituanie ", "path": "/fr/geographie/europe/", "uid": "lt", "count": 0, "distance": 0, "image": "/images/e618a51ee75bf19aa0ce723de42f6b7c-lithuania.png", "flag": "/static/circle-flags/fr.svg", "wpm": 32.18116805721097, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9599696277089989, "answerScore": 0.9959969627708999, "previousScore": 0, "newScore": 0.9959969627708999, "deltaScore": 0.9959969627708999 },
      { "maxDistance": 0, "time": 4430, "expected": "Slovénie", "answered": "Slovénie ", "path": "/fr/geographie/europe/", "uid": "si", "count": 0, "distance": 0, "image": "/images/66ea9b9c45c9a23c812db7a593a9cca8-slovenia.png", "flag": "/static/circle-flags/fr.svg", "wpm": 24.37923250564334, "ratioMaxDistance": 1, "ratioDistance": 1, "ratioWpm": 0.9126579492012471, "answerScore": 0.9912657949201247, "previousScore": 0, "newScore": 0.9912657949201247, "deltaScore": 0.9912657949201247 }
    ];

    
    // Prepare the data for display
    this.results = model.processCurrentStatistics(this.answersStats);

    // Populate static results
    view.setNewResults(this.results);


    console.log(this.results)
    //console.log(JSON.stringify(this.answersStats));

    // Show the modal promise
    return view.showModal();
  }


  /**
   * Add a set of data related to a question is 
   * @param {object} qStat the data related to the current question
   */
  push(qStat) {

    // Display the success or failed card according to the final distance
    if (qStat.distance)
      view.showFailedCard(qStat.newScore * 100, qStat.time, qStat.wpm);
    else
      view.showSuccessCard(qStat.newScore * 100, qStat.time, qStat.wpm);

    // Append questions statistics to the global stats
    this.answersStats.push(qStat);


    // Return the upgrading question statistics
    return qStat;
  }



}



export default new C_currentStatistics();