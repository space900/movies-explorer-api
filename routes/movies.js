const moviesRouter = require('express').Router();
// const auth = require('../middlewares/auth');

// moviesRouter.use(auth);

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  movieValidation, movieIdValidation,
} = require('../middlewares/validation');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', movieValidation, createMovie);
moviesRouter.delete('/movies/:_id', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
