const Movie = require('../models/movie');
const ErrorNames = require('../utils/error-names');
const StatusCodes = require('../utils/status-codes');
const StatusMessages = require('../utils/status-messages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
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
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner,
  })
    .then((movie) => res.status(StatusCodes.CREATED).send(movie))
    .catch((err) => {
      if (err.name === ErrorNames.VALIDATION) {
        throw new BadRequestError(`Переданы некорректные данные при добавлении фильма: ${err}`);
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError();
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError();
      } else {
        return movie.remove()
          .then(() => res.status(StatusCodes.OK).send({ message: StatusMessages.OK }));
      }
    })
    .catch((err) => {
      if (err.name === ErrorNames.CAST) {
        throw new BadRequestError(StatusMessages.INVALID_ID);
      }
      next(err);
    })
    .catch(next);
};
