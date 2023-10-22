


class V_MemoryTestLanguage {


  /**
   * Contructor get card elements
   */
  constructor() {

    this.flagAnimationEl = document.getElementById("flip-flag-animation");

    // Get the language flags
    this.flagFrontEl = document.getElementById("language-flag-front");
    this.flagBackEl = document.getElementById("language-flag-back");

    // Keep track of the front and back image sources
    this.backImageSrc = "#";
    this.frontImageSrc = "#";



    // Event when the animation is over
    this.flagAnimationEl.addEventListener("animationend", (event) => {
      
      // Set the new front flag
      this.flagFrontEl.src = this.frontImageSrc;

      // Remove the animation
      this.flagAnimationEl.classList.remove("animate");
    });


  }

  /**
   * Set the next flag to display
   * @param {string} imageSrc Path or URL of the next flag
   */
  setNextFlag(imageSrc) {
    this.backImageSrc = imageSrc;
  }


  /**
   * Set and display the current flag
   * @param {string} imageSrc Path or URL of the current flag
   */
  setCurrentFlag(imageSrc) {
    this.frontImageSrc = imageSrc;
    this.flagFrontEl.src = imageSrc;
  }


  /**
   * Switch the flags (run the animation)
   * Do not run the animation if the flags are identical
   * @returns True if the flag has changed, false otherwier
   */
  showNextFlag() {

    // Do not run the animation if the image is the same (no changes)
    if (this.backImageSrc === this.frontImageSrc) return false;

    // Set the next image
    this.flagBackEl.src = this.backImageSrc;

    // Start the animation
    this.flagAnimationEl.classList.add("animate");

    // The next image becomes the new from image
    this.frontImageSrc = this.backImageSrc;

    // The flag has changed, return true
    return true;
  }



  /**
 * Set the image in the language flag
 * @param {string} imageSrc Path or URL to the flag image
 */
/*
  setLanguageFlag(imageSrc) {
    this.flagFrontEl.src = imageSrc;
    this.flagBackEl.src = "/static/circle-flags/de.svg";
  }
*/





}




export default V_MemoryTestLanguage;