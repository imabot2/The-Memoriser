import memoryTest from "Js/controllers/C_memory-test.js";

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


  loadQuizzes(paths) {

    return new Promise((resolve) => {
      let promises = [];
      // Load each memory test
      paths.forEach((path) => {
        const id = this.onNewMessageCallback(`Loading memory test ${path}`);
        const promise = memoryTest.addQuiz(path);
        promise.then(() => { this.onUpdateMessageSuccessCallback(id, "success"); })
        promise.catch(() => { this.onUpdateMessageErrorCallback(id, "error"); })
        promises.push(promise);
      })


      Promise.all(promises).finally(() => { resolve() });

    })
    
  }



  setNewMessageCallback(callback) {
    this.onNewMessageCallback = callback;
  }

  updateMessageSuccessCallback(callback) {
    this.onUpdateMessageSuccessCallback = callback;
  }

  updateMessageErrorCallback(callback) {
    this.onUpdateMessageErrorCallback = callback;
  }


}

export default new M_Main();