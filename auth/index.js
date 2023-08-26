const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {
  // return jwt.sign(data, 'secret', {expiresIn: '1h'}); Another form
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw error('You can not this edit', 401);
    }
  }
}

function getToken(headersAuth) {
  if (!headersAuth) {
    throw new Error('Token not found');
  }

  if (headersAuth.indexOf('Bearer ') === -1) {
    throw new Error('Token invalid format!');
  }

  let token = headersAuth.replace('Bearer ', '');

  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
}