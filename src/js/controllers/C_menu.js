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
    
    //console.log(event);
    
    switch (event.type) {
      case 'navigation': this.goToMenu(event.target); break;

    }
  }

  goToMenu(target) {

    // Get the target 
    let menu = target.split('/');

    // Populate the next menu
    switch (menu[0]) {
      case 'categories': view.populateCategories(menu[1]); break;
      
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



}

export default new C_Menu();