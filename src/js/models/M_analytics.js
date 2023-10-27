import { getAnalytics, logEvent } from "firebase/analytics";
import app from "Js/models/M_firebase.js";


class M_Analytics {

  /**
   * Constructor
   */
  constructor() {
    this.analytics = getAnalytics(app);
  }



  /**
   * Log an event
   * @param {string} event The event to log
   */
  log (eventName, data) {
    logEvent(this.analytics, eventName, data);
  }
}


export default new M_Analytics();