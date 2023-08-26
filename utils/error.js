function err(message, code) {
  let newError = new Error(message);

  if (code) {
    newError.statusCode = code;
  }

  return newError;

}

module.exports = err;