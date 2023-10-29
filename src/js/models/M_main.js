import memoryTest from "Js/controllers/C_memory-test.js";
import "Js/controllers/C_special-characters.js";

class M_Main {

  /**
   * Constructor, initialize the message callback
   */
  constructor() {

    // Set the callback function for the messages
    this.onNewMessageCallback = () => { };
    this.onUpdateMessageSuccessCallback = () => { };
    this.onUpdateMessageErrorCallback = () => { };
  }


  /**
   * Load a batch of quizzes
   * @param {array} paths An array with the paths of the quizzes to load
   * @returns A promise resolved when the quizzes are loaded
   */
  loadQuizzes(paths) {

    return new Promise((resolve) => {
      
      // Array of promises
      let promises = [];

      // Load each memory test
      paths.forEach((path) => {
        
        const id = this.onNewMessageCallback(`Loading memory test ${path}`);
        const promise = memoryTest.addQuiz(path);
        promise.then(() => { this.onUpdateMessageSuccessCallback(id, "success"); })
        promise.catch(() => { this.onUpdateMessageErrorCallback(id, "error"); })
        promises.push(promise);
      })

      // The promise is resolved when all the promises are resolved or rejected
      Promise.allSettled(promises).finally(() => { resolve() })
      .catch((error) => {
        console.error (error);
        resolve();
      })
    })
    
  }


  /**
   * Set the callback function called when a new message is sent
   * @param {function} callback Callback function 
   */
  setNewMessageCallback(callback) {
    this.onNewMessageCallback = callback;
  }

  /**
   * Set the callback function called in case of success
   * @param {function} callback Callback function 
   */
  updateMessageSuccessCallback(callback) {
    this.onUpdateMessageSuccessCallback = callback;
  }

  /**
   * Set the callback function called in case of error
   * @param {function} callback Callback function 
   */
  updateMessageErrorCallback(callback) {
    this.onUpdateMessageErrorCallback = callback;
  }


}

export default new M_Main();