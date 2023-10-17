import view from "Js/views/V_timer.js";
import model from "Js/models/M_timer.js";


/**
 * Class Controller SignUp, manage authentification (login, logout ...)
 */
class C_Timer {

  /**
   * Constructor initialize the memory test
   */
  constructor() {

    // Set default timer parameters
    this.seconds = 0;
    this.direction = "up";

    // Set the callback function to update the timer
    model.onUpdate((time) => this.onUpdate(time));

    // Callback function when the timer is over
    this.onOverCallback = () => { }
    model.onTimerOver(() => { this.onOverCallback(); });
  }

  /*
   * Initialize the timer to a given value
   * @param {integer} seconds Inital value of the timer in seconds
   * @param {string} direction Direction of the timer [ "up" | "down" ]
   */
  init(seconds, direction) {

    this.seconds = seconds;
    this.direction = direction ?? "down";
    this.reset();
  }


  /**
   * Reset the timer to the inital value
   */
  reset() {
    model.init(this.seconds, this.direction);
    this.refresh();
  }


  /**
   * Start or restart the timer
   */
  start() {
    model.start();
  }


  /**
   * Show the timer with animation
   */
  show() {
    view.show();
  }

  /**
   * Refresh the timer in the view
   * It time is not provided, get current time from the timer
   * @param {object} time The time object with minutes, seconds ...
   */
  refresh(time) {

    time = time ?? model.getTime();
    if (time.countDown)
      view.setValue(time.sec, time.doz);
    else
      view.setValue(time.min, time.sec);
  }


  /**
   * Callback function called when the timer must be updated
   * @param {object} time The time object with minutes, seconds ...
   */
  onUpdate(time) {
    this.refresh(time);
  }


  /**
   * Set the callback function called when the timer is over
   * @param {function} callback Callback function called when the timer is over
   */
  onOver(callback) {
    this.onOverCallback = callback;
  }

}

export default new C_Timer();
