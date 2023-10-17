import "Assets/css/timer.css";
import * as bootstrap from 'bootstrap';


class V_Timer {

  constructor() {
    
    // Get the main container
    this.timerContainer = document.getElementById("timer-container");

    // Get the text of the timer
    this.timerText = this.timerContainer.querySelector("span");
  }


  setValue(minutes, seconds) {
    this.timerText.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }



  /**
   * Show the timer with the animation
   */
  show() {
    this.timerContainer.style.top = `-${10}px`;
  }

  /**
 * Hide the timer with the animation
 */
  hide() {
    let h = this.timerContainer.offsetHeight;
    this.timerContainer.style.top = `-${1.4 * h}px`;
  }


  /**
   * Makes the timer blink
   */
  startBlinking() {
    this.timerText.classList.add("blink");
  }
  
  
  /**
   * Stops the timer from blinking
   */
  stopBlinking() {
    this.timerText.classList.remove("blink");
  }
  
}



export default new V_Timer();