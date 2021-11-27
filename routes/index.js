// const router = require('express').Router();
// const mongoose = require('mongoose');
// const usersRouter = require('./users');
// const moviesRouter = require('./movies');
// const messages = require('../errors/messages');
// const auth = require('../middlewares/auth');
// const NotFoundError = require('../errors/classes/notFoundError');
// const {
//   createUser, login, signOut,
// } = require('../controllers/users');
// const { userValidation, loginValidation } = require('../middlewares/validation');

// mongoose.connect('mongodb://localhost:27017/moviesdb', {
//   useUnifiedTopology: true,
// });

// router.post('/signup', userValidation, createUser);
// router.post('/signin', loginValidation, login);
// router.use(auth);
// router.post('/signout', signOut);
// router.use('/users', usersRouter);

// router.use(usersRouter);
// router.use(moviesRouter);

// router.use('*', () => {
//   throw new NotFoundError(messages.NOT_FOUND);
// });

// module.exports = router;
