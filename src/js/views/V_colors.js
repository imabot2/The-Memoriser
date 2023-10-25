class V_Colors {

  constructor() {

    // Get root style for the colors
    const rootStyle = getComputedStyle(document.body);


    // Get each color
    this.blue = rootStyle.getPropertyValue('--main-blue');
    this.red = rootStyle.getPropertyValue('--main-red');
    this.yellow = rootStyle.getPropertyValue('--main-yellow');
    this.orange = rootStyle.getPropertyValue('--main-orange');
    this.green = rootStyle.getPropertyValue('--main-green');
    this.purple = rootStyle.getPropertyValue('--main-purple');
    this.lightGrey = rootStyle.getPropertyValue('--main-light-grey');
    this.darkGrey = rootStyle.getPropertyValue('--main-dark-grey');
        
  }



}

export default new V_Colors();