import flagEnglish from "Assets/images/circle-flags/language/en.svg";

import algeria from "Quizzes/en/geography/africa/img/algeria.png";
import angola from "Quizzes/en/geography/africa/img/angola.png";
import benin from "Quizzes/en/geography/africa/img/benin.png";
import botswana from "Quizzes/en/geography/africa/img/botswana.png";
import burkinaFaso from "Quizzes/en/geography/africa/img/burkina-faso.png";
import burundi from "Quizzes/en/geography/africa/img/burundi.png";
import cameroon from "Quizzes/en/geography/africa/img/cameroon.png";
import capeVerde from "Quizzes/en/geography/africa/img/cape-verde.png";
import centralAfricanRepublic from "Quizzes/en/geography/africa/img/central-african-republic.png";
import chad from "Quizzes/en/geography/africa/img/chad.png";
import comoros from "Quizzes/en/geography/africa/img/comoros.png";
import democraticRepublicOfTheCongo from "Quizzes/en/geography/africa/img/democratic-republic-of-the-congo.png";
import djibouti from "Quizzes/en/geography/africa/img/djibouti.png";

/*
import zimbabwe from "Quizzes/en/geography/africa/img/zimbabwe.png"
import zambia from "Quizzes/en/geography/africa/img/zambia.png"
import uganda from "Quizzes/en/geography/africa/img/uganda.png"
import tunisia from "Quizzes/en/geography/africa/img/tunisia.png"
import togo from "Quizzes/en/geography/africa/img/togo.png"
import tanzania from "Quizzes/en/geography/africa/img/tanzania.png"
import sudan from "Quizzes/en/geography/africa/img/sudan.png"
import southSudan from "Quizzes/en/geography/africa/img/south-sudan.png"
import southAfrica from "Quizzes/en/geography/africa/img/south-africa.png"
import somalia from "Quizzes/en/geography/africa/img/somalia.png"
import sierraLeone from "Quizzes/en/geography/africa/img/sierra-leone.png"
import seychelles from "Quizzes/en/geography/africa/img/seychelles.png"
import senegal from "Quizzes/en/geography/africa/img/senegal.png"
import saoTomeAndPrincipe from "Quizzes/en/geography/africa/img/sao-tome-and-principe.png"
import rwanda from "Quizzes/en/geography/africa/img/rwanda.png"
import republicOfTheCongo from "Quizzes/en/geography/africa/img/republic-of-the-congo.png"
import nigeria from "Quizzes/en/geography/africa/img/nigeria.png"
import niger from "Quizzes/en/geography/africa/img/niger.png"
import namibia from "Quizzes/en/geography/africa/img/namibia.png"
import mozambique from "Quizzes/en/geography/africa/img/mozambique.png"
import morocco from "Quizzes/en/geography/africa/img/morocco.png"
import mauritius from "Quizzes/en/geography/africa/img/mauritius.png"
import mauritania from "Quizzes/en/geography/africa/img/mauritania.png"
import mali from "Quizzes/en/geography/africa/img/mali.png"
import malawi from "Quizzes/en/geography/africa/img/malawi.png"
import madagascar from "Quizzes/en/geography/africa/img/madagascar.png"
import libya from "Quizzes/en/geography/africa/img/libya.png"
import liberia from "Quizzes/en/geography/africa/img/liberia.png"
import lesotho from "Quizzes/en/geography/africa/img/lesotho.png"
import kenya from "Quizzes/en/geography/africa/img/kenya.png"
import ivoryCoast from "Quizzes/en/geography/africa/img/ivory-coast.png"
import guineaBissau from "Quizzes/en/geography/africa/img/guinea-bissau.png"
import guinea from "Quizzes/en/geography/africa/img/guinea.png"
import ghana from "Quizzes/en/geography/africa/img/ghana.png"
import gambia from "Quizzes/en/geography/africa/img/gambia.png"
import gabon from "Quizzes/en/geography/africa/img/gabon.png"
import ethiopia from "Quizzes/en/geography/africa/img/ethiopia.png"
import eswatini from "Quizzes/en/geography/africa/img/eswatini.png"
import eritrea from "Quizzes/en/geography/africa/img/eritrea.png"
import equatorialGuinea from "Quizzes/en/geography/africa/img/equatorial-guinea.png"
import egypt from "Quizzes/en/geography/africa/img/egypt.png"









*/


// Target language of the test
export var metaData = {

  // Flag of the quizz answers language
  flag: flagEnglish,

  // Special characters for this test
  specialCharacters: [
  ]
}



export var questions = [
  {
    uid: "dz",
    image: algeria,
    prompt: "What country is this?",
    answer: "Algeria"
  },
  {
    uid: "ao",
    image: angola,
    prompt: "What country is this?",
    answer: "Angola"
  },
  {
    uid: "bj",
    image: benin,
    prompt: "What country is this?",
    answer: "Benin"
  },
  {
    uid: "bw",
    image: botswana,
    prompt: "What country is this?",
    answer: "Botswana"
  },
  {
    uid: "bf",
    image: burkinaFaso,
    prompt: "What country is this?",
    answer: "Burkina Faso"
  },
  {
    uid: "bi",
    image: burundi,
    prompt: "What country is this?",
    answer: "Burundi"
  },
  {
    uid: "cm",
    image: cameroon,
    prompt: "What country is this?",
    answer: "Cameroon"
  },
  {
    uid: "cv",
    image: capeVerde,
    prompt: "What country is this?",
    answer: "Cape Verde"
  },
  {
    uid: "cf",
    image: centralAfricanRepublic,
    prompt: "What country is this?",
    answer: "Central African Republic"
  },
  {
    uid: "td",
    image: chad,
    prompt: "What country is this?",
    answer: "Chad"
  },
  {
    uid: "km",
    image: comoros,
    prompt: "What country is this?",
    answer: "Comoros"
  },
  {
    uid: "cd",
    image: democraticRepublicOfTheCongo,
    prompt: "What country is this?",
    answer: "Democratic Republic of the Congo"
  },
  {
    uid: "dj",
    image: djibouti,
    prompt: "What country is this?",
    answer: "Bjibouti"
  },
  
/*



    {
      image: egypt,
      text: "Egypt ",
      mask: "xxxxx "
    },
    {
      image: equatorialGuinea,
      text: "Equatorial Guinea ",
      mask: "xxxxxxxxxxxxxxxxx "
    },
    {
      image: eritrea,
      text: "Eritrea ",
      mask: "xxxxxxx "
    },
    {
      image: eswatini,
      text: "Eswatini ",
      mask: "xxxxxxxx "
    },
    {
      image: ethiopia,
      text: "Ethiopia ",
      mask: "xxxxxxxx "
    },
    {
      image: gabon,
      text: "Gabon ",
      mask: "xxxxx "
    },
    {
      image: gambia,
      text: "Gambia ",
      mask: "xxxxxx "
    },
    {
      image: ghana,
      text: "Ghana ",
      mask: "xxxxx "
    },
    {
      image: guinea,
      text: "Guinea ",
      mask: "xxxxxx "
    },
    {
      image: guineaBissau,
      text: "Guinea-Bissau ",
      mask: "xxxxxxxxxxxxx "
    },
    {
      image: ivoryCoast,
      text: "Ivory Coast ",
      mask: "xxxxxxxxxxx "
    },
    {
      image: kenya,
      text: "Kenya ",
      mask: "xxxxx "
    },
    {
      image: lesotho,
      text: "Lesotho ",
      mask: "xxxxxxx "
    },
    {
      image: liberia,
      text: "Liberia ",
      mask: "xxxxxxx "
    },
    {
      image: libya,
      text: "Libya ",
      mask: "xxxxx "
    },
    {
      image: madagascar,
      text: "Madagascar ",
      mask: "xxxxxxxxxx "
    },
    {
      image: malawi,
      text: "Malawi ",
      mask: "xxxxxx "
    },
    {
      image: mali,
      text: "Mali ",
      mask: "xxxx "
    },
    {
      image: mauritania,
      text: "Mauritania ",
      mask: "xxxxxxxxxx "
    },
    {
      image: mauritius,
      text: "Mauritius ",
      mask: "xxxxxxxxx "
    },
    {
      image: morocco,
      text: "Morocco ",
      mask: "xxxxxxx "
    },
    {
      image: mozambique,
      text: "Mozambique ",
      mask: "xxxxxxxxxx "
    },
    {
      image: namibia,
      text: "Namibia ",
      mask: "xxxxxxx "
    },
    {
      image: niger,
      text: "Niger ",
      mask: "xxxxx "
    },
    {
      image: nigeria,
      text: "Nigeria ",
      mask: "xxxxxxx "
    },
    {
      image: republicOfTheCongo,
      text: "Republic of the Congo ",
      mask: "xxxxxxxxxxxxxxxxxxxxx "
    },
    {
      image: rwanda,
      text: "Rwanda ",
      mask: "xxxxxx "
    },
    {
      image: saoTomeAndPrincipe,
      text: "Sao Tome and Principe ",
      mask: "xxxxxxxxxxxxxxxxxxxxx "
    },
    {
      image: senegal,
      text: "Senegal ",
      mask: "xxxxxxx "
    },
    {
      image: seychelles,
      text: "Seychelles ",
      mask: "xxxxxxxxxx "
    },
    {
      image: sierraLeone,
      text: "Sierra Leone ",
      mask: "xxxxxxxxxxxx "
    },
    {
      image: somalia,
      text: "Somalia ",
      mask: "xxxxxxx "
    },
    {
      image: southAfrica,
      text: "South Africa ",
      mask: "xxxxxxxxxxxx "
    },
    {
      image: southSudan,
      text: "South Sudan ",
      mask: "xxxxxxxxxxx "
    },
    {
      image: sudan,
      text: "Sudan ",
      mask: "xxxxx "
    },
    {
      image: tanzania,
      text: "Tanzania ",
      mask: "xxxxxxxx "
    },
    {
      image: togo,
      text: "Togo ",
      mask: "xxxx "
    },
    {
      image: tunisia,
      text: "Tunisia ",
      mask: "xxxxxxx "
    },
    {
      image: uganda,
      text: "Uganda ",
      mask: "xxxxxx "
    },
    {
      image: zambia,
      text: "Zambia ",
      mask: "xxxxxx "
    },
    {
      image: zimbabwe,
      text: "Zimbabwe ",
      mask: "xxxxxxxx "
    },
    */
]; // 54 countries

// True if the carousel is diplayed in the text
export var isCarousel = true;

