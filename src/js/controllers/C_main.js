import view from "Js/views/V_main.js";
import "Js/controllers/C_login.js";
import "Js/controllers/C_sign-up.js";
import "Js/controllers/C_timer.js";
import memoryTest from "Js/controllers/C_memory-test.js"
import { isMobile } from "Js/lib/client.js";
import { clientLanguage } from "../lib/client";

let run = () => {


  // Promise containing the typing tests
  let promises = [];


  // Load the typing test according to the client language
  switch (clientLanguage) {
    case "fr":
      if (process.env.NODE_ENV == "production") {
        promises.push(memoryTest.addQuiz('/fr/geographie/europe/'));
      }
      if (process.env.NODE_ENV == "development") {
        //promises.push(memoryTest.addQuiz('/en/geography/europe/'));
        promises.push(memoryTest.addQuiz('/fr/geographie/europe/'));
        promises.push(memoryTest.addQuiz('/en/geography/africa/'));
      }
      break;
    default: promises.push(memoryTest.addQuiz('/en/geography/europe/'));

  }



  // When the quizzes are all loaded
  Promise.all(promises).finally(() => {

    // Initialize the memory test (promise is resolved if the questions images are loaded)
    memoryTest.reset().then(() => {

      setTimeout(() => {
        
        // Hide the loader overlay
        view.hideLoader(300);        

        // If user is not on mobile device, set focus to the answer input
        // On mobile device, do not focus to prevent soft keyboard from opening
        if (!isMobile()) document.getElementById('answer-input').focus();

      }, 100);
    });
  })




}

export default run;