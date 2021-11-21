const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
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

module.exports = mongoose.model('user', userSchema);
