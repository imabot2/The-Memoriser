import model from "Js/models/M_settings.js";


class C_Settings {

  constructor() {
  }

  /**
   * Getter for a given parameter
   * @param label Label of the parameter
   * @returns The requested parameter
   */
  get(label) {
    return model.data[label];
  }


  /**
   * Set a value for a given parameter
   * @param {string} key The parameter to update
   * @param {any} value The value to set
   */
  setParameter(key, value) {

    switch (key) {
      case 'duration':
        model.data.timerDirection = "down";
        model.data.timerValue = value;
        break;

    }

  }
}


export default new C_Settings();