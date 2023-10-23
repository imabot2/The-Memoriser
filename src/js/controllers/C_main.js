import view from "Js/views/V_main.js";
import auth from "Js/models/M_auth.js";
import "Js/controllers/C_login.js";
import "Js/controllers/C_sign-up.js";
import "Js/controllers/C_timer.js";
import memoryTest from "Js/controllers/C_memory-test.js"
import { isMobile } from "Js/lib/client.js";
import { clientLanguage } from "../lib/client";

// Get the loader status bar
let loaderContent = document.getElementById("loader-status");

let run = async () => {


  // Check if the user is logged before loading the memory tests
  loaderContent.innerHTML += "Loading user data";
  let user = await auth.onUserStateChanged();
  loaderContent.innerHTML += " [OK]<br>";

  // Promise containing the typing tests
  let promises = [];


  // Load the typing test according to the client language
  loaderContent.innerHTML += "Loading memory tests";
  switch (clientLanguage) {
    case "fr":
      if (process.env.NODE_ENV == "production") {
        promises.push(memoryTest.addQuiz("/fr/geographie/europe/"));
      }
      if (process.env.NODE_ENV == "development") {
        //promises.push(memoryTest.addQuiz("/en/geography/europe/"));
        //promises.push(memoryTest.addQuiz("/fr/geographie/europe/"));
        promises.push(memoryTest.addQuiz("/en/geography/africa/"));
        //promises.push(memoryTest.addQuiz("/iso/country-code/europe/"));
      }
      break;
    default: promises.push(memoryTest.addQuiz("/en/geography/europe/"));

  }



  // When the quizzes are all loaded
  Promise.all(promises).finally(() => {

    console.log("resolved");

    loaderContent.innerHTML += " [OK]<br>";
    // Initialize the memory test (promise is resolved if the questions images are loaded)
    memoryTest.reset().then(() => {

      // Hide the loader overlay
      view.hideLoader(300);

      // If user is not on mobile device, set focus to the answer input
      // On mobile device, do not focus to prevent soft keyboard from opening
      if (!isMobile()) document.getElementById('answer-input').focus();

    });
  })



}

export default run;