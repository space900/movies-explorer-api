const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const messages = require('../errors/messages');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          const isValid = isURL(v);
          return isValid;
        },
        message: messages.BAD_URL_VALIDATION,
      },
    },
    trailer: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          const isValid = isURL(v);
          return isValid;
        },
        message: messages.BAD_URL_VALIDATION,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          const isValid = isURL(v);
          return isValid;
        },
        message: messages.BAD_URL_VALIDATION,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      ref: 'movie',
      required: true,
      unique: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
