const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isEmail, isURL } = require('validator');
const messages = require('../errors/messages');

// const validator = require('validator');
// const messages = require('../errors/messages');

// const isURL = (v) => {
//   const res = validator.isURL(v, { require_protocol: true });
//   if (res) {
//     return v;
//   }
//   throw new Error(messages.BAD_URL_VALIDATION);
// };

// const isURL = (v) => {
//   const res = validator.isURL(v, { require_protocol: true });
//   if (res) {
//     return v;
//   }
//   throw new Error(messages.BAD_URL_VALID);
// };

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom((value) => {
      if (!isEmail(value)) {
        throw new CelebrateError(messages.BAD_REQUEST_EMAIL_CREATE);
      }
      return value;
    }),
    password: Joi.string().required(),
  }),
});

module.exports.userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email().custom((value) => {
      if (!isEmail(value)) {
        throw new CelebrateError(messages.BAD_REQUEST_EMAIL_CREATE);
      }
      return value;
    }),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email().custom((value) => {
      if (!isEmail(value)) {
        throw new CelebrateError(messages.BAD_REQUEST_EMAIL_CREATE);
      }
      return value;
    }),
  }),
});

module.exports.movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.BAD_REQUEST);
      }
      return value;
    }),
    trailer: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.BAD_REQUEST);
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.BAD_REQUEST);
      }
      return value;
    }),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});
