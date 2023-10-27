// Initialize Firebase, the analytics
import "Js/models/M_firebase.js";
import "Js/models/M_analytics.js";


import view from "Js/views/V_main.js";
import model from "Js/models/M_main.js";
import auth from "Js/models/M_auth.js";
import "Js/controllers/C_login.js";
import "Js/controllers/C_sign-up.js";
import "Js/controllers/C_timer.js";
import memoryTest from "Js/controllers/C_memory-test.js";
import { clientLanguage } from "../lib/client";
import notifications from "Js/views/V_notifications";
import quizzes from "Js/models/M_quizzes-list.js";

console.log (quizzes);


import currentStatistics from "Js/controllers/C_current-statistics.js";

// Set the callback functions for the loader
model.setNewMessageCallback(msg => view.newMessage(msg));
model.updateMessageSuccessCallback(id => view.setSuccess(id));
model.updateMessageErrorCallback(id => view.setError(id));




let run = async () => {


  // Check if the user is logged before loading the memory tests
  let authId = view.newMessage("Checking for authentification");
  let user = await auth.onUserStateChanged();
  view.setSuccess(authId);

  // Promise containing the typing tests
  let promises = [];


  // Load the typing test according to the client language
  let memoryTestId = view.newMessage("Loading memory tests");
  let memoryTests = [];
  switch (clientLanguage) {
    case "fr":
      if (process.env.NODE_ENV == "production") {
        memoryTests = ["/fr/pays-sur-la-carte/europe/"];
      }
      if (process.env.NODE_ENV == "development") {
        memoryTests = [
          "/en/countries-on-the-map/europe/",
          "/fr/pays-sur-la-carte/europe/",     
          "/iso/country-codes/europe/",
          "/en/countries-on-the-map/africa/",
          "/en/chess/stockfish-starting-position/"
        ];
      }
      break;
    default: memoryTests = ["/en/geography/europe/"];
  }


  // When the quizzes are all loaded
  model.loadQuizzes(memoryTests).finally(() => {

    // Memory tests are all loaded
    view.setSuccess(memoryTestId);

    // Initialize the memory test (promise is resolved if the questions images are loaded)
    let imagesId = view.newMessage("Loading first images");
    memoryTest.reset()
    .then(() => {
      view.setSuccess(imagesId);


      setTimeout(() => {
        // Hide the loader overlay
        view.hideLoader(300);
        memoryTest.start();

        // FOR DEBUG
        //currentStatistics.showResults();


      }, 100)
    })
      .catch((error) => {
        notifications.error("An error occured", error, 60000);
        view.setError(imagesId);
      })
  })



}

export default run;