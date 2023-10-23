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

          // Quiz is loaded, get statistics from data
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

      // Sanitize document name for Firestore
      let docName = path.slice(1, -1).replaceAll('/', '\\');

      // Document to read
      const docRef = doc(db, "users", `${auth.getUserID()}`, "statistics", docName);

      // Get the document from the database
      getDoc(docRef)
        .then((docSnap) => {

          // Get the list of UID to update or create
          let uidList = this.getUidList(path);

          if (docSnap.exists()) {

            // Get stats from the DB data
            let dbData = docSnap.data();
            this.statCounter[path] = dbData.counter;

            // For each UID in the questions of this path
            uidList.map((uid) => {

              // Get the stat for the given UID and update or create
              let stat = dbData.stats.find((dbStat) => { return dbStat.uid === uid });
              super.updateOrCreateStat(path, uid, stat);
            });
          }
          else {
            // The document does not exists, create new stats
            uidList.map((uid) => { super.createStatsIfDontExist(path, uid); });

            // Set the counter to 0
            this.statCounter[path] = 0;
          }
          // Always resolve (load or create statistics)
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
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