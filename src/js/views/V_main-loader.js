class V_MainLoader {

  /**
   * Constructor
   * - Get DOM element 
   * - Reset messages
   */
  constructor() {

    // Get the container of the dialog box
    this.dialog = document.getElementById("boot-loader-status");

    // No message at start up
    this.messages = {};
    this.resetMessages();

    // Create the event when all the message are resolved
    this.lastMessageResolvedEvent = new Event("last-message-resolved");
  }


  /**
   * Delete all messages
   */
  resetMessages() {

    // Delete the elements
    Object.values(this.messages).forEach(message => {
      message.el.remove();
    })

    // Reset the arrays
    this.messages = {};
    this.index = 0;
    this.pending = 0;

  }

  /**
   * Create and show a new message
   * @param {string} message The message to display
   * @returns the message ID
   */
  newMessage(message) {

    // Get the loader container element
    this.loaderEl = document.getElementById("boot-loader");

    // Create new element
    let row = document.createElement("div");
    row.innerHTML = `<span>${message}</span> <span class="status">[Loading...]</span>`;

    // Prepend the element in the dialog box and scroll to the bottom
    this.dialog.append(row);
    this.dialog.scrollTo(0, this.dialog.scrollHeight);

    // Store the element and the messagein the list
    this.messages[this.index] = {
      'el': row,
      'msg': message
    }

    // Increase the number of pending messages
    this.pending++;
    // Return and increase the index
    return this.index++;
  }



  /**
   * Mark a message as successfull
   * @param {integer} id ID of the message
   */
  setSuccess(id) {
    let el = this.messages[id].el.querySelector(".status")
    el.textContent = "[OK]";
    el.classList.add("success");
    console.log(`%cOK%c ${this.messages[id].msg}`, "background-color: #198754; padding:0.3em; border-radius: 0.5em;", '');
    this.pending--;
    if (this.pending == 0) this.dialog.dispatchEvent(this.lastMessageResolvedEvent);
  }


  /**
   * Mark a message as failed
   * @param {integer} id ID of the message
   */
  setError(id) {
    let el = this.messages[id].el.querySelector(".status")
    el.textContent = "[Failed]";
    el.classList.add("error");
    console.log(`%cFailed%c ${this.messages[id].msg}`, "background-color: #dc3545; padding:0.3em; border-radius: 0.5em;", '');
    this.pending--;
    if (this.pending == 0) this.dialog.dispatchEvent(this.lastMessageResolvedEvent);
    this.countErrors++;
  }


  /**
   * Hide the loader overlay
   * @param {integer} ms Fade out duration in milliseconds
   */
  showLoader(ms = 250, opacity = 0.95) {

    // Set deflaut time is ms is not provided
    ms = ms ?? 250;
    this.loaderEl.classList.remove("d-none");
    // Set transition time and start transition
    this.loaderEl.style.transition = `opacity ${ms}ms ease-in-out`;
    this.loaderEl.style.opacity = opacity;
  }


  /**
   * Show the loader (if messages are pending)
   * And resolve the the last message is resolved
   * @returns A promise resolved when there is no more pending messages
   */
  showLoaderWhilePending() {

    return new Promise((resolve) => {

      // If no message are pending, resolve and return
      if (this.pending == 0) { resolve(); return; }

      // There are pending messages, wait until they are resolved
      this.showLoader();

      // Resolve the promise when the last message is resolved
      this.dialog.addEventListener('last-message-resolved', () => {
        resolve();
      }, { once: true });
    })
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
      this.resetMessages();
    }, ms);
  }
}




export default V_MainLoader;