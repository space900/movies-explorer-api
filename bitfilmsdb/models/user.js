const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const messages = require('../../errors/messages');
const UnauthorizedError = require('../../errors/classes/unauthorized');
// const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        const isValid = isEmail(v);
        return isValid;
      },
      message: ['Неправильный формат почты'],
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(messages.BAD_LOGIN_OR_PSWRD));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(messages.BAD_LOGIN_OR_PSWRD));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
