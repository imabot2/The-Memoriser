import view from "Js/views/V_menu.js"
import memoryTest from "Js/controllers/C_memory-test.js";
import notifications from "Js/views/V_notifications";
import loader from "Js/views/V_main.js";

class C_Menu {

  /**
   * Constructor 
   * - Set callback function
   * - Initialize variables
   * - Populate the language menu
   */
  constructor() {

    // Callback menu for back button
    view.setBackBtnCallback(() => { this.onBackBtn() });
    view.setMenuBtnCallback((e) => { this.onMenuBtn(e) });
    view.setModalHiddenCallback(() => { this.onModalHide() })

    // Set the initial current menu
    this.currentMenu = 'main';

    // Populate the language menu
    view.populateLanguages();
  }




  /**
   * Process a click in the menu button
   * @param {object} event The event properties
   */
  onMenuBtn(event) {

    switch (event.type) {
      case 'navigation': this.goToMenu(event.target); break;
      case 'add-remove-quiz':
        if (!event.checked) {
          if (!memoryTest.removeQuiz(event.target)) {
            notifications.warning('No Test Selected', `You must select at least one memory test.`, 1500);
            view.checkSwitch(event.id);
          }
        }
        else {

          // Add a message in the loader
          let id = loader.newMessage(`Loading memory test ${event.target}.`);

          // Load a new quiz
          memoryTest.addQuiz(event.target)
            .then(() => {
              loader.setSuccess(id);
            })
            .catch(() => {
              loader.setSuccess(error);
              notifications.error('Loading Error', `Error while loading the memory test ${event.target}.`);
            })

        }

        break;


      case 'select-quiz':
        if (event.checked) {

          // Add a message in the loader
          let id = loader.newMessage(`Loading single memory test ${event.target}.`);

          // Load and replace with a new quiz
          memoryTest.replaceAllQuiz(event.target)
            .then(() => {
              loader.setSuccess(id);
              
            })
            .catch((error) => {
              loader.setError(id);
              notifications.error('Loading Error', `Error while loading a single memory test ${event.target}.`);
            })

        }

        break;

    }
  }

  goToMenu(target) {

    // Get the target 
    let menu = target.split('/');

    // Populate the next menu
    switch (menu[0]) {
      case 'categories': view.populateCategories(menu[1]); break;
      case 'list': view.populateList(menu[1], menu[2]); break;
    }

    // Show the next menu
    this.currentMenu = menu[0];
    view.showMenu(menu[0]);
  }



  /**
   * Callback function called when the back button is clicked
   */
  onBackBtn() {

    // Select previous menu according to the current one
    switch (this.currentMenu) {
      case 'main': view.hideModal(); return;
      case 'languages': this.currentMenu = 'main'; break;
      case 'categories': this.currentMenu = 'languages'; break;
      case 'list': this.currentMenu = 'categories'; break;
    }
    // Show the previous menu
    view.showMenu(this.currentMenu);
  }


  /**
   * Callback function called when the modal is closed
   */
  onModalHide() {

    // Set the initial current menu
    this.currentMenu = 'main';
    view.showMenu('main');

    // Show the loader until message are pending
    loader.showLoaderWhilePending()
      .then(() => {
        memoryTest.reset().then(() => {
          loader.hideLoader();
          memoryTest.start();
        })
      })
  }

}

export default new C_Menu();