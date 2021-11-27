const Movie = require('../models/movie');
const messages = require('../errors/messages');
const NotFoundError = require('../errors/classes/notFoundError');
const ForbiddenError = require('../errors/classes/forbiddenError');
const BadRequestError = require('../errors/classes/badRequestError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie)
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError(messages.BAD_REQUEST);
        } else {
          next(err);
        }
      }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const id = req.user._id;
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messages.NOT_FOUND);
      }
      if (movie.owner.toString() !== id) {
        throw new ForbiddenError(messages.NOT_FOUND);
      } else {
        return movie.remove()
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      }
    })
    .catch(next);
};
