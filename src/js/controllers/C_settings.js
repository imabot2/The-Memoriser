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
}


export default new C_Settings();