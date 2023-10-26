import M_MemoryTestQuestions from "Js/models/M_memory-test-questions.js";
import settings from "Js/controllers/C_settings.js";




class M_MemoryTestStatistics extends M_MemoryTestQuestions {

  // Constructor 
  constructor() {
    super();

    // Statistics of the current quizzes
    this.stats = [];

    // No last question at start up
    this.lastQuestion = undefined;
  }


  /**
   * Compute the next question
   * - Previous question can't be picked
   * - unasked questions are prioritary
   * - compute proba and pick a question
   * @returns The next question
   */
  getNextQuestion() {

    // Remove the last question if defined
    if (this.lastQuestion !== undefined) {
      this.stats.splice(this.stats.indexOf(this.lastQuestion), 1);
    }

    // Get the unasked questions and prepare the next question variable
    let next, unasked = this.getUnanskedQuestions();

    // If there are unasked question, pick one of the unasked question
    if (unasked.length) {
      // There are unasked questions
      // Pick a random unasked questions
      let index = Math.floor(Math.random() * unasked.length);
      next = unasked[index];
    }
    else {
      // All the question have been asked
      // Compute the probabilites and pick a question
      let max = this.computeProbabilities();
      const random = max * Math.random();
      next = this.stats.find(q => (random >= q.min && random < q.max));
    }

    // Put the last question back 
    // The last question has been removed to avoid picking the same question twice    
    if (this.lastQuestion != undefined) this.stats.push(this.lastQuestion);
    // Update the last question with the new one
    this.lastQuestion = next;


    // Return the next question
    return this.getQuestionAndStatByID(next.path, next.uid);
  }


  /**
   * Return a question and its statistics
   * @param {string} path Path of the question
   * @param {string} uid UID of the question
   * @returns The question with the associated statistics
   */
  getQuestionAndStatByID(path, uid) {

    // Get the question and the statistics for this question
    let question = super.getQuestionByID(path, uid);
    let stat = this.getStatByUid(path, uid);

    // Add the statistics to the question 
    question.count = stat.count;
    question.P = stat.P;
    question.score = stat.score;

    // Return the question
    return question;
  }


  /**
   * Compute the probability for each question and pick a question
   * @returns The last cumulated probability
   */
  computeProbabilities() {
    // Get and scale beta coefficient
    let beta = (5 - settings.get("beta")) / 5;
    beta = (beta >= 0) ? (1 + beta) ** 3.7 : 1 + beta;

    // Normalize the score z(i) = 1-(score-min(score(i)))
    // Compute the exponential exp = exp(beta*z(i))
    const min = Math.min(...this.stats.map(q => q.score))


    // Compute z and the exponential for each question
    // z=1 - (score - min)
    // exp = exp(beta * z)
    this.stats.forEach((q) => { q.z = 1 - (q.score - min); q.exp = Math.exp(beta * q.z); });

    // Compute the sum for the deniminator sum = Σ(exp(beta*z));
    const sum = this.stats.reduce((accumulator, q) => accumulator + Math.exp(beta * q.z), 0);

    // Compute probabilities P(i) = exp(beta*z(i))/sum;
    // And cumulated probability
    let acc = 0;
    this.stats.forEach((q) => { q.P = q.exp / sum; q.min = acc; acc = q.max = acc + q.P; });
    return acc;
  }


  /**
   * Get the list of questions than have been asked
   * @returns An array with all the question with a counter equal to zero
   */
  getUnanskedQuestions() {
    return this.stats.filter(q => !q.count);
  }



  /**
   * Overload the questions.addQuiz and create empty statistics for the quiz 
   * Load a quiz and and create empty stats for each question 
   * return a promise when the file  is loaded and append statistics to the list
   * testPath must start and end with /, ie : /fr/grec/alphabet/
   * @param {string} quizPath - Path of the quiz folder
   * @returns A promise resolved when the quiz is loaded
   */
  addQuiz(path) {
    return new Promise((resolve, reject) => {

      // Load the questions from file
      super.addQuiz(path)
        .then((questions) => {

          // The questions are successfully loaded, create the initial statistics
          this.createStatsForQuiz(path);
          resolve(questions);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }


  /**
   * Create the initial statistics for a given quiz
   * Append data to this.stats
   * @param {string} path Path of the quiz 
   */
  createStatsForQuiz(path) {
    this.getUidList(path).forEach((uid) => {
      this.createStatsIfDontExist(path, uid);
    })

  }


  /**
   * Update global statistics with the stats of a given question
   * @param {object} qStat Statistics of the question to update
   */
  update(path, uid, answerScore) {

    // Get a reference to the current question
    let qToUpdate = this.getStatByUid(path, uid);

    // Store the previous score (for computing the offset)
    let previousScore = qToUpdate.score;
    qToUpdate.score = (qToUpdate.score * qToUpdate.count + answerScore) / (qToUpdate.count + 1);

    // Increase the counter for this question
    qToUpdate.count++;

    // Return the previous and the new score
    return {"previousScore": previousScore, "newScore": qToUpdate.score };
  }


  /**
   * Remove the statistics for a given path and call the parent function to remove the questions
   * @param {string} path Path of the quiz to remove
   */
  removeQuiz(path) {
    // Remove stats for this path
    this.stats = this.stats.filter((q) => { return q.path !== path });
    // Remove the question
    super.removeQuiz(path);
  }

  /**
   * Create the statistics entry if the entry does not exist
   * @param {string} path Path of the question
   * @param {string} uid Unique Identifier of the question
   * @returns A reference to the statistics of the question
   */
  updateStatForPathUid(path, uid, data) {

    // Get the stat for the requested path & UID
    let stat = this.stats.find((q) => { return (q.path === path && q.uid === uid) });

    // Update stat data
    stat.count = data.count;
    stat.score = data.score;

    // Return the updated stat
    return stat;
  }




  /**
   * Create the statistics entry if the entry does not exist
   * @param {string} path Path of the question
   * @param {string} uid Unique Identifier of the question
   * @returns A reference to the statistics of the question
   */
  createStatsIfDontExist(path, uid) {

    // Get the requested statistics
    let stat = this.stats.find((q) => { return (q.path === path && q.uid === uid) });

    // If the question is not in the array, create the question
    if (stat === undefined) {
      let index = this.stats.push({
        "count": 0,
        "score": 0,
        "path": path,
        "uid": uid,
        "exp": 0,
        "P": 0,
      });

      // Return the inserted elemnt
      return this.stats[index - 1];
    }

    // Return the requested statistics
    return stat;
  }


  /**
   * Get a reference to the statistics of a given question
   * @param {string} path Path of the question
   * @param {string} uid Unique Identifier of the question
   * @returns A reference to the statistics of the question
   */
  getStatByUid(path, uid) {
    return this.stats.find(q => q.path === path && q.uid === uid);
  }


  /**
   * Returns the number of statistics for the current memory test
   * @returns The number of statistics
   */
  countStatistics() {
    return this.stats.length;
  }

}

export default M_MemoryTestStatistics;