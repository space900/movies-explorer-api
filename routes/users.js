const router = require('express').Router();
// const auth = require('../middlewares/auth');

const {
  getCurrentUser, updateUser, signOut,
} = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validation');

// usersRouter.post('/signup', userValidation, createUser);
// usersRouter.post('/signin', loginValidation, login);
// usersRouter.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', userInfoValidation, updateUser);
router.delete('/signout', signOut);
// usersRouter.get('users/:userId', userIdValidation, getUserById);
// usersRouter.use(auth);
// usersRouter.delete('/signout', signOut);

module.exports = router;
