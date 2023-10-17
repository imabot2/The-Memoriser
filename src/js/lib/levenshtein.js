
export default class Levenshtein {

  /**
   * Constructor of the Levenshtein class set default parameters
   */
  constructor() {

    // Set default options
    this.options = {};
    this.options.trim = false;
    this.options.removeExtraSpaces = false;
    this.options.ignoreHyphens = false;
    this.options.caseSensitive = true;
    this.options.ignoreAccents = false;
    this.options.appendSpaces = false;
  }


  /**
   * Set the options 
   * - trim: when true, spaces at the beginnig and end of the string are removed
   * - removeExtraSpace: when true, remove extra spaces "a   b" becomes "a b", "a  -  b" becomes "a-b"
   * - ignoreHyphens: when true hyphens and spaces are equal
   * - caseSensitive: when true, the comparison is case sensitive
   * - ignoreAccent: when true, accent are ignored
   * - appendSpaces: prepend spaces to the shortest string to get two strings with the same size
   * @param {object} options object with the options
   */
  setOptions(options) {
    this.options.trim = options.trim ?? this.options.trim;
    this.options.removeExtraSpaces = options.removeExtraSpaces ?? this.options.removeExtraSpaces;
    this.options.ignoreHyphens = options.ignoreHyphens ?? this.options.ignoreHyphens;
    this.options.caseSensitive = options.caseSensitive ?? this.options.caseSensitive;
    this.options.ignoreAccents = options.ignoreAccents ?? this.options.ignoreAccents;
    this.options.appendSpaces = options.appendSpaces ?? this.options.appendSpaces;
  }


  /**
   * Compute the Levenshtein distance between two strings
   * @param {string} from 
   * @param {string} to 
   * @returns 
   */
  distance(from = '', to = '') {

    // Store the string for the path() method
    this.from = from;
    this.to = to;
    
    // OPERATIONS THAT MODIFY STRING LENGTH

    // Trim
    if (this.options.trim) this.from = this.from.trim();
    if (this.options.trim) this.to = this.to.trim();


    // Remove extra spaces
    if (this.options.removeExtraSpaces) this.from = this.from.replace(/\s*-\s*/, "-").replace(/\s+/g, " ");
    if (this.options.removeExtraSpaces) this.to = this.to.replace(/\s*-\s*/, "-").replace(/\s+/g, " ");

    if (this.options.appendSpaces && this.from.length < this.to.length) this.from += " ".repeat(this.to.length - this.from.length);
    if (this.options.appendSpaces && this.from.length > this.to.length) this.to += " ".repeat(this.from.length - this.to.length);
      


    this.toCopy = this.to
    this.fromCopy = this.from

    // OPERATIONS THAT DO NOT MODIFY STRING LENGTH


    // Replace hyphens if hyphens are ignored
    if (this.options.ignoreHyphens) this.from = this.from.replace(/-/g, " ");
    if (this.options.ignoreHyphens) this.to = this.to.replace(/-/g, " ");

    // To lower case if case non sensitive
    if (!this.options.caseSensitive) this.from = this.from.toLowerCase();
    if (!this.options.caseSensitive) this.to = this.to.toLowerCase();

    // Remove accents if ignored
    if (this.options.ignoreAccents) this.from = this.from.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (this.options.ignoreAccents) this.to = this.to.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    

    // Create the array and initialize with null
    this.D = Array(this.to.length + 1).fill(null).map(() => Array(this.from.length + 1).fill(null));

    // Set initial values in the first row and column
    for (let y = 0; y <= this.from.length; y += 1) this.D[0][y] = y;
    for (let x = 0; x <= this.to.length; x += 1) this.D[x][0] = x;

    // Compute the Levenshtein matrix D
    for (let x = 1; x <= this.to.length; x += 1) {
      for (let y = 1; y <= this.from.length; y += 1) {
        const substitution = this.from[y - 1] === this.to[x - 1] ? 0 : 1;

        // Keep the shortest path between deletion, insertion, substitution and keep
        this.D[x][y] = Math.min(
          this.D[x][y - 1] + 1,               // Deletion
          this.D[x - 1][y] + 1,               // Insertion
          this.D[x - 1][y - 1] + substitution // Substitution or keep
        );
      }
    }

    // Display the matrix for debug 
    // Note that the matrix is transposed on display
    //this.D.forEach(v => console.log(...v));

    
    // Return the Levenshtein distance (bottom right cell of the matrix)
    let d = this.D[this.to.length][this.from.length];

    this.from = this.fromCopy;
    this.to = this.toCopy;

    return d;
  };


  /**
   * Compute a HTML string with the operation as class of the HTML elements
   * @returns A string containing the HTML
   */
  getHTML() {

    // Get the list of operations
    let list = this.getOperationsList();

    // Prepare HTML
    let html = "";

    // For each operation
    list.forEach((op) => {
      op.from = op.from;
      op.to = op.to;
      switch (op.type) {

        case "keep":
          html += `<span class="keep">${op.to}</span>`;
          break;

        case "substitute":          
          html += `<span class="delete substitute">${op.from}</span>`;
          html += `<span class="insert substitute">${op.to}</span>`;
          break;

        case "insert":
          html += `<span class="insert">${op.to}</span>`;
          break;

        case "delete":
          html += `<span class="delete">${op.from}</span>`;
          break;
      }
    })
    return html;

  }



  getOperationsList() {

    this.operations = [];

    // Set initial / final coordinates
    let x = this.to.length;
    let y = this.from.length;

    // Loop until reaching the top let cell
    while (x > 0 || y > 0) {


      // Compute the minimal distance
      let min = this.D[x][y]
      if (x > 0 && y > 0) min = Math.min(min, this.D[x - 1][y - 1]);
      if (x > 0) min = Math.min(min, this.D[x - 1][y]);
      if (y > 0) min = Math.min(min, this.D[x][y - 1]);

      let op = {};

      // Keep or substitute the letter
      if (x > 0 && y > 0 && this.D[x - 1][y - 1] === min) {
        if (this.D[x][y] === this.D[x - 1][y - 1]) {

          // Keep the letter
          this.addOperation("keep", this.from[y - 1], this.to[x - 1], x);
          x--;
          y--;
          continue;
        }
        else {
          // Substitute the letter
          this.addOperation("substitute", this.from[y - 1], this.to[x - 1], x);
          x--;
          y--;
          continue;
        }
      }




      // Delete the letter
      if (y > 0 && this.D[x][y - 1] === min) {
        this.addOperation("delete", this.from[y - 1], "", x);
        y--;
        continue;
      }

      // Insert a letter
      if (x > 0 && this.D[x - 1][y] === min) {
        this.addOperation("insert", "", this.to[x - 1], x);
        x--;
        continue;
      }


    }

    return this.operations;
  }



  /**
   * Add or merge a new operation in the list
   * @param {string} type The type of operation [ keep | substitute | delete | insert ]
   * @param {string} from Original string
   * @param {string} to Destination string
   * @param {integer} pos Position of the operation
   */
  addOperation(type, from, to, pos) {

    // If this is the same operation than the last one, merge the new operation with the previous
    if (this.operations.length && type === this.operations[0].type) {
      this.operations[0].from = from + this.operations[0].from;
      this.operations[0].to = to + this.operations[0].to;
      this.operations[0].pos = pos;
      return;
    }

    // This is a new operation, add the operation at the begining of the list
    let op = {}
    op.type = type;
    op.from = from;
    op.to = to;
    op.pos = pos;
    this.operations.unshift(op);
  }



}
