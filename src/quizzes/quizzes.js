import en from "./en/categories.js";
import de from "./de/categories.js";
import fr from "./fr/categories.js";
import iso from "./iso/categories.js";

const quizzes = {
  en: {
    name: 'English',
    categories: en,
  },
  fr: {
    name: 'Français',
    categories: fr,
  },
  de: {
    name: 'Deutsch',
    categories: de,
  },
  iso: {
    name: 'ISO Norm',
    categories: iso,
  },
};

export default quizzes;