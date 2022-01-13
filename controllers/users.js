const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ErrorNames = require('../utils/error-names');
const StatusCodes = require('../utils/status-codes');
const StatusMessages = require('../utils/status-messages');
const { JWT_SECRET } = require('../utils/constants');

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require('../errors/index');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === ErrorNames.CAST) {
        throw new BadRequestError(StatusMessages.INVALID_ID);
      }
      next(err);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(StatusCodes.CREATED).send(user))
    .catch((err) => {
      if (err.name === ErrorNames.MONGO && err.code === StatusCodes.MONGO_ERROR) {
        throw new ConflictError();
      }
      if (err.name === ErrorNames.VALIDATION) {
        throw new BadRequestError(`Переданы некорректные данные при создании пользователя: ${err}`);
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === ErrorNames.CAST) {
        throw new BadRequestError(StatusMessages.INVALID_ID);
      }
      if (err.name === ErrorNames.MONGO && err.code === StatusCodes.MONGO_ERROR) {
        throw new ConflictError();
      }
      if (err.name === ErrorNames.VALIDATION) {
        throw new BadRequestError(`Переданы некорректные данные при обновлении профиля: ${err}`);
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError();
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      })
        .send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError(`${err.message}`);
    })
    .catch(next);
};

module.exports.signOut = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Кука удалена' });
  next();
};
