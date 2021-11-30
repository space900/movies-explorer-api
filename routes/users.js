const router = require('express').Router();

const {
  getCurrentUser, updateUser, signOut,
} = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', userInfoValidation, updateUser);
router.post('/signout', signOut);

module.exports = router;
