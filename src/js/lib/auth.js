import passwordValidator from "password-validator";
import validator from "email-validator";



/**
 * Check is a password is valid and return a human readable string explaining the problem
 * @param {string} password The password to check
 * @returns {string} A human readable string that explain why the password is not valid or an empty string if the password is valid
 */
export function checkPassword(password) {

  // Create a schema
  var schema = new passwordValidator();

  // Add properties to it
  schema
    .is().min(8, "A minimum of 8 characters is required")
    .is().max(100, "Maximum of 100 characters")
    .has().uppercase(1, "At least one uppercase character")
    .has().lowercase(1, "At least one lowercase character")
    .has().digits(1, "At least one digit")

  // Get a full list of rules which failed
  let validation = schema.validate(password, { details: true });
  if (validation.length == 0) return "";
  return validation[0].message;
}



/**
 * Check if an email address is valid
 * @param {string} email The email address to check
 * @returns True if the email is valid
 */
export function checkEmail(email) {
  return validator.validate(email);
}

export default { checkPassword, checkEmail };

