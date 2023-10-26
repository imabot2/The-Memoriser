

export default class AnswerCard {

  /**
   * Constructor, clone the card model
   */
  constructor() {

    // Get and clone the card model
    let model = document.getElementById("answer-card-model");
    this.cardEl = model.cloneNode(true);
    
    // Remove the ID
    this.cardEl.removeAttribute("id");
    this.cardEl.classList.remove("answer-card-model")
    this.cardEl.classList.add("answer-card")
  }


  /**
   * 
   * @param {*} idLabel 
   * @param {*} data 
   */
  populate(idLabel, data) {

    // Populate header
    this.cardEl.querySelector(".id-badge").innerText = idLabel;
    this.cardEl.querySelector(".card-img-top").src = data.image;
    this.cardEl.querySelector(".flag").src = data.flag;

    // Populate title
    this.cardEl.querySelector(".score").innerText = `${parseFloat((100 * data.answerScore).toFixed(1))}%`;

    // Prepare progression badge
    let progress = 100 * (data.newScore - data.previousScore);
    let progressText = (progress >= 0) ? '+' : '';
    progressText += progress.toFixed((progress > 10) ? 1 : 2);
    progressText += "%";

    // Set value in the badge
    let badge = this.cardEl.querySelector(".progression")

    // Set badge color
    badge.innerText = progressText;
    if (progress < 0) badge.classList.add("bg-danger")
    if (progress == 0) badge.classList.add("bg-dark")
    if (progress > 0) badge.classList.add("bg-success")

    this.cardEl.querySelector(".expected").innerText = data.expected;
    this.cardEl.querySelector(".user-answer").innerText = data.answered;
    this.cardEl.querySelector(".answered").innerText = `${data.count+1} ${(data.count)?'times':'time'}`;
    this.cardEl.querySelector(".time").innerText = `${(data.time / 1000).toFixed((data.time < 12000) ? 1 : 0)}s`;
    this.cardEl.querySelector(".accuracy").innerText = `${parseFloat(((100 * data.ratioMaxDistance).toFixed(1)))}%`;
    this.cardEl.querySelector(".wpm").innerText = `${(data.wpm).toFixed(0)}wpm`;

    // Update the badge in the card footer
    if (data.distance) {
      this.cardEl.querySelector(".card-footer > img").src = "/static/icons/error.png";
      this.cardEl.classList.add("failed");
    }
    else
      this.cardEl.querySelector(".card-footer > img").src = "/static/icons/success.png";
  }


  /**
   * Append the card in the DOM
   */
  append() {

    // Make the card visible and append to the DOM
    this.cardEl.classList.remove("d-none");
    document.querySelector("#answer-cards").append(this.cardEl);
  }


  /**
   * Delete the card from the DOM
   */
  delete() {
    this.cardEl.remove();
  }

}