/**
 * Timer
 * Timer count down and up
 * Get time in minutes, seconds and dozen of milliseconds
 * Start / stop / pause functions 
 */
export default class Timer {


  /**
   * Constructor, initialise the timer
   */
  constructor() {

    // Set default callback functions
    this.onTimerOverCallback = () => { };
    this.onUpdateCallback = () => { };

    // Stop the timer at intialization
    this.duration = this.elapsedTime = 0;
    this.isRunning = false;

    // Set the default value for the count down to zero seconds
    this.countDownThreshold = 0;
  }


  /**
   * Set the callback function called when the timer is over
   * @param {function} callback Callback function called when the timer is over
   */
  onTimerOver(callback) {
    this.onTimerOverCallback = callback;
  }


  /**
   * Set the callback function called when the timer is updated (every second)
   * @param {function} callback Callback functin called when the timer is updated
   */
  onUpdate(callback) {
    this.onUpdateCallback = callback;
  }


  /*
   * Initialize the timer to a given value
   * @param {integer} seconds Inital value of the timer in seconds
   * @param {string} direction Direction of the timer [ "up" | "down" ]
   */
  init(seconds, direction) {

    // Stop current timeout
    clearTimeout(this.timeout);
    this.isRunning = false;

    // Keep the timer direction
    this.countDown = (direction !== "up");

    // Calculate and update remaining time
    this.duration = seconds * 1000;
    this.elapsedTime = (this.countDown) ? 0 : this.duration;
    this.remainingTime = this.duration;
  }


  /**
   * Set the elapsed time from which the timer will be updated in dozen of milliseconds
   * @param {integer} seconds Trigger time in seconds
   */
  setCountDownThreshold(seconds) {
    this.countDownThreshold = seconds;
  }


  /**
   * Split the time to minutes, seconds and dozen
   * @param {integer} ms Raw time (remaining or elapsed) in milliseconds
   * @returns  {object} An object with { min : minutes, sec : seconds, doz: dozen of ms, countDown: count down mode (bool) }
   */
  splitTime(ms) {

    let time = {}
    time.raw = ms;

    // Calculate seconds
    let s = Math.round(ms / 1000);

    // Convert to minutes, seconds and dozen of milliseconds
    time.min = Math.floor(s / 60);
    time.sec = Math.floor((s % 60));
    time.doz = Math.round((ms % 1000) / 10);
    time.countDown = (s < this.countDownThreshold && this.countDown);

    // Return the timer object
    return time;
  }

  /**
   * Get the current time splitted in minutes, seconds dozens
   * @returns  {object} An object with { min : minutes, sec : seconds, doz: dozen of ms, countDown: count down mode (bool) }
   */
  getTime() {
    let time;

    // if the timer is running, calculate dynamic time
    if (this.isRunning) {
      if (this.countDown) {

        // Remaining time
        let currentTime = new Date().getTime();
        time = Math.max(0, this.timeOver - currentTime);
      }
      else {
        // Calculate elapsed time
        let currentTime = new Date().getTime();
        time = currentTime - this.startingTime;
      }
    }
    // The timer is not running, get current remaining or elapsed time
    else {
      time = (this.countDown) ? this.remainingTime : this.elapsedTime ;
    }

    // Return the splitted time
    return this.splitTime(time);
  }


  /**
   * Return the elapsed time (pauses are considered)
   * @returns {integer} The elapsed time in milliseconds
   */
  getElapsedTime() {

    // If the timer is running, calculate the elapsed time
    // Otherwise, return the already calculated elapsed time
    if (this.isRunning) {

      // Calculate elapsed time
      let currentTime = new Date().getTime();
      return currentTime - this.startingTime;
    }
    else {
      // If the timer is not running, return the last elapsed time
      return this.elapsedTime;
    }
  }


  /**
   *  Start or restart the timer
   */
  start() {
    // If the timer is currently running, do nothing
    if (this.isRunning) return;

    // Dispatch to the real function acccording to timer direction
    if (this.countDown) this.startCountdown(); else this.startCountUp();

    // The timer is now running
    this.isRunning = true;
  }


  /**
   * Start the counter in count down mode
   */
  startCountdown() {

    // If countdown, initialize values for the animation and the time over
    // Calculate the time when the timer will finish
    this.timeOver = new Date().getTime() + this.remainingTime;


    // Store the starting time
    this.startingTime = new Date().getTime() - this.elapsedTime;


    // Call the next function to start the timer
    this.nextCountDown();
  }


  /**
   * Start the counter in count up mode
   */
  startCountUp() {

    // Store the starting time
    this.startingTime = new Date().getTime() - this.elapsedTime;

    // Call the next function to start the timer
    this.nextCountUp();
  }


  /**
   *  Pause the timer
   */
  pause() {
    // If the timer is already stopped, do nothing
    if (!this.isRunning) return;

    // Dispatch to the real function acccording to timer direction
    if (this.countDown) this.stopCountDown(); else this.stopCountUp();

  }


  /**
   * Stop the timer in count down mode
   */
  stopCountDown() {
    // Stop the timer
    clearTimeout(this.timeout);

    // Store the remaining time
    this.remainingTime = this.timeOver - new Date();

    // Keep the current elapsed time
    this.elapsedTime = new Date() - this.startingTime;

    // The timer is no longer running
    this.isRunning = false;
  }


  /**
   * Stop the timer in counter (up) mode
   */
  stopCountUp() {

    // Stop the elapsed time
    clearTimeout(this.timeout);

    // Keep the current value of the timer
    this.elapsedTime = new Date() - this.startingTime;

    // The timer is no longer running
    this.isRunning = false;
  }


  /**
   *  Launch an ~1s timer to trigger next update in count down mode 
   */
  nextCountDown() {

    // Calculate elapsed time
    let currentTime = new Date().getTime();
    let remainingTime = Math.max(0, this.timeOver - currentTime);

    // The threeshold is not reached, normal display
    this.onUpdateCallback(this.splitTime(remainingTime));

    // Update the timer with the elaspsed time        
    if (remainingTime <= 0) {
      this.onTimerOverCallback();
      this.stopCountDown();
      return;
    }

    // Calculate the delay before the next display change
    let sampleTime = (remainingTime <= this.countDownThreshold * 1000) ? 10 : 1000;

    // Calculate the delay before the next display change
    let timeBeforeNextCall = remainingTime % sampleTime;
    timeBeforeNextCall = (timeBeforeNextCall == 0) ? sampleTime : timeBeforeNextCall;

    // Set time out for next call
    this.timeout = setTimeout(() => { this.nextCountDown(); }, timeBeforeNextCall);

  }


  /**
   * Launch an ~1s timer to display next update un counter mode
   */
  nextCountUp() {

    // Calculate elapsed time
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - this.startingTime;

    // Callback function the timer with the elaspsed time
    this.onUpdateCallback(this.splitTime(elapsedTime));

    // Calculate the delay before the next display change
    let nextCall = 1000 - elapsedTime % 1000;
    nextCall = (nextCall == 0) ? 1000 : nextCall;

    // Set time out for next call
    this.timeout = setTimeout(() => { this.nextCountUp(); }, nextCall);
  }


}


