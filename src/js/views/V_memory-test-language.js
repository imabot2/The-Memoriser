


class V_MemoryTestLanguage {


  /**
   * Contructor get card elements
   */
  constructor() {

    // Get the card element
    this.flagCardEl = document.getElementById("flag-category");

    // Get the flag image
    this.flagImageEl = this.flagCardEl.querySelector("img");

    // Get the card content
    this.flagContentEl = this.flagCardEl.querySelector(".content");

    this.flagCardEl.style.setProperty("--language-card-fadeout-delay", "500ms");

    // Previous data of the card (to prevent showing the card several times)
    this.previousFlag = { flag: undefined, message: undefined };


    // Get the language flag
    this.flagFrontEl = document.getElementById("language-flag-front");
    this.flagBackEl = document.getElementById("language-flag-back");
  }


  /**
   * Set the language card flag and message
   * @param {object} data Data to update
   * @returns True if a change occured, false otherwise
   */
  setLanguageCard(data) {
    // Check if the message has changed
    if (data.flag === this.previousFlag.flag && data.message === this.previousFlag.message) return false;
    this.previousFlag = data;

    // Set the flag and message
    this.setLanguageCardFlag(data.flag);
    this.setLanguageCardMessage(data.message);

    return true;
  }


  /**
   * Set the image flag
   * @param {integer} imageSrc URL or path to the image
   */
  setLanguageCardFlag(imageSrc) {
    this.flagImageEl.src = imageSrc;
  }


  /**
   * Set the card content
   * @param {string} html The HTML to place in the card content
   */
  setLanguageCardMessage(html) {
    this.flagContentEl.innerHTML = html;
  }


  /**
   * Show the language card and hide the card after ms milliseconds (with a default value of 1000ms)
   * @param {integer} ms Delay before the card is hidden
   */
  showLanguageCard(ms = 1500) {
    this.flagCardEl.classList.add("show");

    if (ms !== 0) {
      setTimeout(() => {
        this.hideLanguageCard();
      }, ms);
    }
  }


  /**
   * Hide the language card
   */
  hideLanguageCard() {
    this.flagCardEl.classList.remove("show");
  }


  /**
 * Set the image in the language flag
 * @param {string} imageSrc Path or URL to the flag image
 */
  setLanguageFlag(imageSrc) {
    this.flagFrontEl.src = imageSrc;
    this.flagBackEl.src = "/static/circle-flags/de.svg";
  }


}




export default V_MemoryTestLanguage;