const jwt = require('jsonwebtoken');
const config = require('config');
const createError = require('http-errors');

const auth = async function(req, res, next) {
  const token = req.headers['x-auth-token']; // eslint-disable-line
  const secret = config.get('secret');
  let verified;
  try {
    verified = await jwt.verify(token, secret);
  } catch (err) {
    next(createError(401, err));
  }

  if (verified) return next();
};

module.exports = auth;
