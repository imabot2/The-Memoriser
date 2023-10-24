import M_MemoryTestStatistics from "Js/models/M_memory-test-statistics.js";
import auth from "Js/models/M_auth.js";
import { db } from "Js/models/M_firebase.js";
import { doc, getDoc, serverTimestamp, writeBatch } from "firebase/firestore";


class M_MemoryTestFirestore extends M_MemoryTestStatistics {

  /**
   * Constructor 
   * - Load parents constructor
   * - Initialize stats counter
   */
  constructor() {

    // Call the parent constructor
    super();

    // Statistics counter (prevent overiding existing statistics)
    this.statCounter = [];
  }


  addQuiz(path) {

    // Return a promise
    return new Promise((resolve, reject) => {

      // Load the quiz from files
      super.addQuiz(path).catch((error) => { reject(error); })
        .then(() => {

          // If the user is not logged, do not load statistics from database
          if (!auth.isLogged()) { resolve(); return; }

          // The user is logged, get statistics from database
          this.loadStatistics(path)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              // If an error occured during DB reading, 
              // Remove the test and reject the promise
              this.removeQuiz(path);
              reject(error);
            })

        })
    })
  }







  /**
   * Load (or create) statistics for a given path
   * @param {string} path Path for which the statistics must be loaded
   * @returns {promise} A promise when the statistics are created or loaded
   */
  loadStatistics(path) {

    // Return a promise
    return new Promise(async (resolve, reject) => {

      // Set the default counter to zero
      this.statCounter[path] = 0;

      // Read data from database
      this.readStatisticsFromDB(path)
        .catch((error) => { reject(error); })
        .then((data) => {

          // If there is data in the database, this is not the first time, update data
          if (data !== undefined) {

            // There is data for this test
            // Set the counter
            this.statCounter[path] = data.counter;

            // Get the list of UID to update
            let uidList = this.getUidList(path);

            // For each UID in the questions of this path
            uidList.map((uid) => {

              // Get the stat for the given UID and update or create
              let stat = data.stats.find((dbStat) => { return dbStat.uid === uid });

              // If the statistic exists for the given path / uid, update the statistics
              if (stat != undefined) super.updateStatForPathUid(path, uid, stat);
            });
          }
          resolve();
        })
    })

  }


  readStatisticsFromDB(path) {
    return new Promise((resolve, reject) => {

      // Sanitize document name for Firestore
      let docName = path.slice(1, -1).replaceAll('/', '\\');

      // Create the document to read
      const docRef = doc(db, "users", `${auth.getUserID()}`, "statistics", docName);

      // Get the document from the database
      getDoc(docRef)
        .catch((error) => { reject(error); })
        .then((docSnap) => {
          // If the document exists, return the stats for the requested quiz, otherwise returns undefined
          if (docSnap.exists())
            resolve(docSnap.data());
          else
            resolve(undefined);
        })
    })
  }


  /**
  * Save the statistics of a given quizz in Firestore
  * @param {string} path path to the quizz to save
  * @returns A promise on Firestore writing
  */
  getQuizStatsToStore(path) {

    // Filter stats to keep only data related to the requested quizz
    let stats = this.stats.filter((q) => q.path === path);

    // Select data to store
    stats = stats.map((q) => {
      return {
        "uid": q.uid,
        "count": q.count,
        "score": q.score
      }
    });
    return stats;
  }


  /**
   * Save global statistics 
   * @returns A promise
   */
  saveStatistics() {

    // Get the quiz names
    let paths = this.getPaths()

    // Get a new write batch
    const batch = writeBatch(db);

    // For each quiz
    paths.forEach(path => {
      // Sanitize document name for Firestore
      let docName = path.slice(1, -1).replaceAll('/', '\\');

      // Increase the statistic counter
      this.statCounter[path]++;

      // Document to write
      const docRef = doc(db, "users", `${auth.getUserID()}`, "statistics", docName);

      // Add the document to the batch
      batch.set(docRef,
        {
          counter: this.statCounter[path],
          timestamp: serverTimestamp(),
          stats: this.getQuizStatsToStore(path),
        })
    })

    // Return the promise
    return batch.commit();
  }

}


export default M_MemoryTestFirestore;