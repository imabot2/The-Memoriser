import view from "Js/views/V_menu.js"



class C_Menu {
  constructor() {

    // Callback menu for back button
    view.setBackBtnCallback(() => { this.onBackBtn() });
    view.setMenuBtnCallback((e) => { this.onMenuBtn(e) });

    // Set the initial current menu
    this.currentMenu = 'main';

    // Populate the language menu
    view.populateLanguages();

  }

  onMenuBtn(event) {
    console.log(event);
    switch (event.type) {
      case 'navigation': this.goToMenu(event.target); break;

    }
  }

  goToMenu(target) {
    let menu = target.split('/');
    switch (menu[0]) {
      case 'categories': view.populateCategories(menu[1]); break;
      
    }

    view.showMenu(menu[0]);
  }



  /**
   * Callback function called when the back button is clicked
   */
  onBackBtn() {
    switch (this.currentMenu) {
      case 'main': view.hideModal();
      case 'languages': view.showMenu('main');
      case 'categories': view.showMenu('languages');
      case 'list': view.showMenu('categories');
    }
  }



}

export default new C_Menu();