const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const {
  createUser, login, signOut,
} = require('../controllers/users');
const { userValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/classes/notFoundError');
const messages = require('../errors/messages');

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.post('/signout', signOut);
router.use('/', usersRouter);
router.use('/', moviesRouter);

router.use('*', () => {
  throw new NotFoundError(messages.NOT_FOUND);
});

module.exports = router;
