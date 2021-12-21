const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const {
  getCurrentUser,
  updateUser,
  signOut,
  createUser,
  login,
} = require('../controllers/users');
const {
  userInfoValidation,
  // userIdValidation,
  loginValidation,
  userValidation,
} = require('../middlewares/validation');

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', userInfoValidation, updateUser);
router.delete('/signout', signOut);

module.exports = router;
