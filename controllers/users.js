const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

/* eslint-disable arrow-body-style */
const User = require('../models/user');
const messages = require('../errors/messages');
const NotFoundError = require('../errors/classes/notFoundError');
const BadRequestError = require('../errors/classes/badRequestError');
const UnauthorizedError = require('../errors/classes/unauthorized');
const ConflictError = require('../errors/classes/conflictError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.cookie('jwt', token, {
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

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(messages.BAD_REQUEST_EMAIL_CREATE);
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => {
        return res.status(200).send({
          name: user.name, email: user.email,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError(messages.BAD_REQUEST);
        } else {
          next(err);
        }
      }))
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

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;

  return User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(messages.NOT_FOUND);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'cookies deleted' });
};
