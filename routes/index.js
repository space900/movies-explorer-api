const router = require('express').Router();

const { createUser, login, signOut } = require('../controllers/users');

const authCheck = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validators');

const { NotFoundError } = require('../errors');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.delete('/signout', signOut);

router.use(authCheck);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404, нет такой страницы'));
});

module.exports = router;
