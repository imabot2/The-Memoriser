import startingPosition from "Quizzes/en/chess/stockfish-starting-position/img/starting-position.png";
import a2a4 from "Quizzes/en/chess/stockfish-starting-position/img/a2a4.png";
import b1c3 from "Quizzes/en/chess/stockfish-starting-position/img/b1c3.png";
import d2d4 from "Quizzes/en/chess/stockfish-starting-position/img/d2d4.png";
import e2e4 from "Quizzes/en/chess/stockfish-starting-position/img/e2e4.png";
import g1f3 from "Quizzes/en/chess/stockfish-starting-position/img/g1f3.png";

// Target language of the test
export var metaData = {

  // Quiz flag
  flag: "/static/circle-flags/gb.svg",


  // Special characters for this test
  specialCharacters: [],
}



export var questions = [
  {
    uid: "root",
    image: startingPosition,
    prompt: "What is the best move?",
    answer: "e2e4"
  },
  {
    uid: "a2e4",
    image: a2a4,
    prompt: "What is the best move?",
    answer: "g8f6"
  },
  {
    uid: "b1c3",
    image: b1c3,
    prompt: "What is the best move?",
    answer: "d7d5"
  },
  {
    uid: "d2d4",
    image: d2d4,
    prompt: "What is the best move?",
    answer: "g8f6"
  },
  {
    uid: "e2e4",
    image: e2e4,
    prompt: "What is the best move?",
    answer: "e7e5"
  },
  {
    uid: "g1f3",
    image: g1f3,
    prompt: "What is the best move?",
    answer: "e7e6"
  },
];