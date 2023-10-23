class V_MainLoader {

  /**
   * Constructor
   * - Get DOM element 
   */
  constructor() {

    // Get the container of the dialog box
    this.dialog = document.getElementById("loader-status");

    // No message at start up
    this.messages = {};
    this.index = 0;

  }


  /**
   * Create and show a new message
   * @param {string} message The message to display
   * @returns the message ID
   */
  newMessage(message) {

    // Get the loader container element
    this.loaderEl = document.getElementById("loader");

    // Create new element
    let row = document.createElement("div");
    row.innerHTML = `<span>${message}</span> <span class="status">[Loading...]</span>`;

    // Prepend the element in the dialog box and scroll to the bottom
    this.dialog.append(row);
    this.dialog.scrollTo(0, this.dialog.scrollHeight);


    // Store the element in the list
    this.messages[this.index] = row;

    // Return and increase the index
    return this.index++;
  }



  /**
   * Mark a message as successfull
   * @param {integer} id ID of the message
   */
  setSuccess(id) {
    let el = this.messages[id].querySelector(".status")
    el.textContent = "[OK]";
    el.classList.add("success");
  }

  /**
   * Mark a message as failed
   * @param {integer} id ID of the message
   */
  setError(id) {
    let el = this.messages[id].querySelector(".status")
    el.textContent = "[Failed]";
    el.classList.add("error");
  }




  /**
   * Hide the loader overlay
   * @param {integer} ms Fade out duration in milliseconds
   */
  hideLoader(ms) {

    // Set deflaut time is ms is not provided
    ms = ms ?? 250;
    // Set transition time and start transition
    this.loaderEl.style.transition = `opacity ${ms}ms ease-in-out`;
    this.loaderEl.style.opacity = 0;

    // Start a timer to hide the overlay (prevent keeping the overlay over page content)
    setTimeout(() => {
      this.loaderEl.classList.add("d-none");
    }, ms);
  }

}


export default V_MainLoader;