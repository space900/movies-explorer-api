const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
// const messages = require('../errors/messages');

// const isURL = (v) => {
//   const res = validator.isURL(v, { require_protocol: true });
//   if (res) {
//     return v;
//   }
//   throw new Error(messages.BAD_URL_VALIDATION);
// };

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});
