const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const messages = require('../../errors/messages');
const NotFoundError = require('../../errors/classes/notFoundError');
const BadRequestError = require('../../errors/classes/badRequestError');
const UnauthorizedError = require('../../errors/classes/unauthorized');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: messages.SUCCESS_REQUEST_AUTH });
    })
    .catch(() => {
      throw new UnauthorizedError(messages.BAD_LOGIN_OR_PSWRD);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.NOT_FOUND);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(err.message);
      }
      next(err);
    })
    .catch(next);
};
