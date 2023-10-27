import countriesOnTheMap from "./countries-on-the-map/list.js";
import chess from "./chess/list.js";

const categories = {
  "countries-on-the-map" : {
    name: 'Countries On The Map',
    list: countriesOnTheMap
  },
  "chess": {
    name: 'Chess',
    list: chess
  },
};

export default categories;