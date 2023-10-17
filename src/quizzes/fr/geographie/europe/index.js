import flagFrench from "Assets/images/circle-flags/language/fr.svg";


import albania from "Quizzes/en/geography/europe/img/albania.png";
import andorra from "Quizzes/en/geography/europe/img/andorra.png";
import austria from "Quizzes/en/geography/europe/img/austria.png"
import belarus from "Quizzes/en/geography/europe/img/belarus.png"
import belgium from "Quizzes/en/geography/europe/img/belgium.png";
import bosniaAndHerzegovina from "Quizzes/en/geography/europe/img/bosnia-and-herzegovina.png";
import bulgaria from "Quizzes/en/geography/europe/img/bulgaria.png"
import croatia from "Quizzes/en/geography/europe/img/croatia.png"
import czechia from "Quizzes/en/geography/europe/img/czechia.png"
import cyprus from "Quizzes/en/geography/europe/img/cyprus.png"
import denmark from "Quizzes/en/geography/europe/img/denmark.png";
import estonia from "Quizzes/en/geography/europe/img/estonia.png"
import finland from "Quizzes/en/geography/europe/img/finland.png";
import france from "Quizzes/en/geography/europe/img/france.png";
import germany from "Quizzes/en/geography/europe/img/germany.png";
import greece from "Quizzes/en/geography/europe/img/greece.png";
import hungary from "Quizzes/en/geography/europe/img/hungary.png"
import iceland from "Quizzes/en/geography/europe/img/iceland.png";
import ireland from "Quizzes/en/geography/europe/img/ireland.png";
import italy from "Quizzes/en/geography/europe/img/italy.png";
import kosovo from "Quizzes/en/geography/europe/img/kosovo.png";
import latvia from "Quizzes/en/geography/europe/img/latvia.png"
import liechtenstein from "Quizzes/en/geography/europe/img/liechtenstein.png"
import lithuania from "Quizzes/en/geography/europe/img/lithuania.png";
import luxembourg from "Quizzes/en/geography/europe/img/luxembourg.png";
import malta from "Quizzes/en/geography/europe/img/malta.png"
import moldova from "Quizzes/en/geography/europe/img/moldova.png"
import monaco from "Quizzes/en/geography/europe/img/monaco.png";
import montenegro from "Quizzes/en/geography/europe/img/montenegro.png"
import netherlands from "Quizzes/en/geography/europe/img/netherlands.png";
import northMacedonia from "Quizzes/en/geography/europe/img/north-macedonia.png"
import norway from "Quizzes/en/geography/europe/img/norway.png";
import poland from "Quizzes/en/geography/europe/img/poland.png";
import portugal from "Quizzes/en/geography/europe/img/portugal.png";
import romania from "Quizzes/en/geography/europe/img/romania.png"
import russia from "Quizzes/en/geography/europe/img/russia.png";
import sanMarino from "Quizzes/en/geography/europe/img/san-marino.png";
import serbia from "Quizzes/en/geography/europe/img/serbia.png";
import slovakia from "Quizzes/en/geography/europe/img/slovakia.png"
import slovenia from "Quizzes/en/geography/europe/img/slovenia.png";
import spain from "Quizzes/en/geography/europe/img/spain.png";
import sweden from "Quizzes/en/geography/europe/img/sweden.png";
import switzerland from "Quizzes/en/geography/europe/img/switzerland.png";
import unitedKingdom from "Quizzes/en/geography/europe/img/united-kingdom.png";
import vaticanCity from "Quizzes/en/geography/europe/img/vatican-city.png";
import ukraine from "Quizzes/en/geography/europe/img/ukraine.png";



// Target language of the test
export var metaData = {

  // Flag of the quizz answers language
  flag: flagFrench,

  // Special characters for this test
  specialCharacters: [
    {
      character: 'é',
      name: "e accent aigu minuscule",
      shortcut: ["`", "e"]
    },
    {
      character: 'É',
      name: "E accent aigu majuscule",
      shortcut: ["`", "E"]
    }
  ]
}



export var questions = [
  {
    uid: "al",
    image: albania,
    prompt: "Quel est ce pays ?",
    answer: "Albanie"
  },
  {
    uid: "ad",
    image: andorra,
    prompt: "Quel est ce pays ?",
    answer: "Andorre"
  },
  {
    uid: "at",
    image: austria,
    prompt: "Quel est ce pays ?",
    answer: "Autriche"
  },
  {
    uid: "by",
    image: belarus,
    prompt: "Quel est ce pays ?",
    answer: "Biélorussie"
  },
  {
    uid: "be",
    image: belgium,
    prompt: "Quel est ce pays ?",
    answer: "Belgique"
  },
  {
    uid: "ba",
    image: bosniaAndHerzegovina,
    prompt: "Quel est ce pays ?",
    answer: "Bosnie-Herzégovine"
  },
  {
    uid: "bg",
    image: bulgaria,
    prompt: "Quel est ce pays ?",
    answer: "Bulgarie"
  },
  {
    uid: "fr",
    image: croatia,
    prompt: "Quel est ce pays ?",
    answer: "Croatie"
  },
  {
    uid: "cz",
    image: czechia,
    prompt: "Quel est ce pays ?",
    answer: "Tchéquie"
  },
  {
    uid: "cy",
    image: cyprus,
    prompt: "Quel est ce pays ?",
    answer: "Chypre"
  },
  {
    uid: "dk",
    image: denmark,
    prompt: "Quel est ce pays ?",
    answer: "Danemark"
  },
  {
    uid: "ee",
    image: estonia,
    prompt: "Quel est ce pays ?",
    answer: "Estonie"
  },
  {
    uid: "fi",
    image: finland,
    prompt: "Quel est ce pays ?",
    answer: "Finlande"
  },
  {
    uid: "fr",
    image: france,
    prompt: "Quel est ce pays ?",
    answer: "France"
  },
  {
    uid: "de",
    image: germany,
    prompt: "Quel est ce pays ?",
    answer: "Allemagne"
  },
  {
    uid: "gr",
    image: greece,
    prompt: "Quel est ce pays ?",
    answer: "Grèce"
  },
  {
    uid: "hu",
    image: hungary,
    prompt: "Quel est ce pays ?",
    answer: "Hongrie"
  },
  {
    uid: "is",
    image: iceland,
    prompt: "Quel est ce pays ?",
    answer: "Islande"
  },
  {
    uid: "ie",
    image: ireland,
    prompt: "Quel est ce pays ?",
    answer: "Irlande"
  },
  {
    uid: "it",
    image: italy,
    prompt: "Quel est ce pays ?",
    answer: "Italie"
  },
  {
    uid: "xk",
    image: kosovo,
    prompt: "Quel est ce pays ?",
    answer: "Kosovo"
  },
  {
    uid: "lv",
    image: latvia,
    prompt: "Quel est ce pays ?",
    answer: "Lettonie"
  },
  {
    uid: "li",
    image: liechtenstein,
    prompt: "Quel est ce pays ?",
    answer: "Liechtenstein"
  },
  {
    uid: "lt",
    image: lithuania,
    prompt: "Quel est ce pays ?",
    answer: "Lituanie"
  },
  {
    uid: "lu",
    image: luxembourg,
    prompt: "Quel est ce pays ?",
    answer: "Luxembourg"
  },
  {
    uid: "mt",
    image: malta,
    prompt: "Quel est ce pays ?",
    answer: "Malte"
  },
  {
    uid: "md",
    image: moldova,
    prompt: "Quel est ce pays ?",
    answer: "Moldavie"
  },
  {
    uid: "mc",
    image: monaco,
    prompt: "Quel est ce pays ?",
    answer: "Monaco"
  },
  {
    uid: "me",
    image: montenegro,
    prompt: "Quel est ce pays ?",
    answer: "Monténégro"
  },
  {
    uid: "nl",
    image: netherlands,
    prompt: "Quel est ce pays ?",
    answer: "Pays-Bas"
  },
  {
    uid: "mk",
    image: northMacedonia,
    prompt: "Quel est ce pays ?",
    answer: "Macédoine du Nord"
  },
  {
    uid: "no",
    image: norway,
    prompt: "Quel est ce pays ?",
    answer: "Norvège"
  },
  {
    uid: "pl",
    image: poland,
    prompt: "Quel est ce pays ?",
    answer: "Pologne"
  },
  {
    uid: "pt",
    image: portugal,
    prompt: "Quel est ce pays ?",
    answer: "Portugal"
  },
  {
    uid: "ro",
    image: romania,
    prompt: "Quel est ce pays ?",
    answer: "Roumanie"
  },
  {
    uid: "ru",
    image: russia,
    prompt: "Quel est ce pays ?",
    answer: "Russie"
  },
  {
    uid: "sm",
    image: sanMarino,
    prompt: "Quel est ce pays ?",
    answer: "Saint-Marin"
  },
  {
    uid: "rs",
    image: serbia,
    prompt: "Quel est ce pays ?",
    answer: "Serbie"
  },
  {
    uid: "sk",
    image: slovakia,
    prompt: "Quel est ce pays ?",
    answer: "Slovaquie"
  },
  {
    uid: "si",
    image: slovenia,
    prompt: "Quel est ce pays ?",
    answer: "Slovénie"
  },
  {
    uid: "es",
    image: spain,
    prompt: "Quel est ce pays ?",
    answer: "Espagne"
  },
  {
    uid: "se",
    image: sweden,
    prompt: "Quel est ce pays ?",
    answer: "Suède"
  },
  {
    uid: "ch",
    image: switzerland,
    prompt: "Quel est ce pays ?",
    answer: "Suisse"
  },
  {
    uid: "gb",
    image: unitedKingdom,
    prompt: "Quel est ce pays ?",
    answer: "Royaume-Uni"
  },
  {
    uid: "va",
    image: vaticanCity,
    prompt: "Quel est ce pays ?",
    answer: "Vatican"
  },
  {
    uid: "ua",
    image: ukraine,
    prompt: "Quel est ce pays ?",
    answer: "Ukraine"
  },
];