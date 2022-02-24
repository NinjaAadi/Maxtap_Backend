//Validator function to check if a string is empty or not and has a desired length or not
exports.isValid = (toCheck, lengthDesired) => {
  if (toCheck == null) return false;
  if (toCheck.length == 0) return false;
  if (lengthDesired != null) {
    if (toCheck.length < lengthDesired) return false;
  }
  return true;
};
//Helper functions for checking that it is a valid time format or not
exports.isValidTimeString = (timeStr) => {
  if (timeStr == null) return false;
  //Time regular expression
  const timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegExp.test(timeStr);
};

//Validate date
exports.validDate = (date) => {
  if (date == null) return false;
  if (new Date(parseInt(date)) == "Invalid Date") return false;
  return true;
};

//Validator functions to validate a url
exports.isUrlValid = (userInput) => {
  if (userInput == null) return false;
  var res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
};
