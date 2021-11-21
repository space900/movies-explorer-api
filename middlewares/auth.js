const jwt = require('jsonwebtoken');
const messages = require('../errors/messages');
const UnauthorizedError = require('../errors/classes/unauthorized');

module.exports.auth = (req, res, next) => {
  const { JWT_SECRET = 'super-strong-secret' } = process.env;

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(messages.UNAUTHORIZED_BAD_REQUEST_AUTH);
  }

  req.user = payload;

  next();
};
