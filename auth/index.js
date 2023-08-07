const jwt = require('jsonwebtoken');

function sign(data) {
  // return jwt.sign(data, 'secret', {expiresIn: '1h'}); Another form
  return jwt.sign(data, 'secret');
}

module.exports = {
  sign,
}