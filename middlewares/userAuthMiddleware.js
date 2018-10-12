const jwt = require('jsonwebtoken');
const config = require('config');
const createError = require('http-errors');

/**
 * verifies user token and returns payload: req.payload
 *
 * @returns {Object} adds payload object as a property on req
 */
const auth = async function(req, res, next) {
  const token = req.headers['x-auth-token']; // eslint-disable-line
  const secret = config.get('secret');
  let verified;
  try {
    verified = jwt.verify(token, secret);
  } catch (err) {
    return next(createError(401, err));
  }

  if (verified) {
    const payload = jwt.decode(token);
    req.payload = payload;
    return next();
  }
};

module.exports = auth;
