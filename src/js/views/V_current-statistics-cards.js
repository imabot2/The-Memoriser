import "Assets/css/current-statistics-cards.css";
import AnswerCard from "Js/views/V_answer-card.js";

export default class V_CurrentStatisticsCards {

  /**
   * Constructor, initialize variables
   */
  constructor() {
    // To store the memory test results
    this.results = [];

    // To store the answer cards
    this.cards = [];
  }


  /**
   * Create and populate the cards
   */
  populateCards() {
        
    // Delete the previous cards
    this.deleteCards();

    // For each answer, create and populate a card
    this.results.answersStats.forEach((stat, key) => {

      // Create a new card
      let card = new AnswerCard();

      // Populate the card with data
      card.populate(`#${key + 1}`, stat);

      // Append the card to the modal content
      card.append();

      //Add the card in the array
      this.cards.push(card);
    });
  }


  /**
   * Delete all the cards
   */
  deleteCards() {
    // Delete each card
    this.cards.forEach((card) => {
      card.delete();
    })

    // Empty the array
    this.cards = [];
  }


  /**
   * Prepare the new results for future display in the modal
   * @param {object} data The statistics of the current memory test
   */
  setNewResults(data) {
    this.results = data;
  }
}