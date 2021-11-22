const router = require('express').Router();

const { getCurrentUser, getUserById, updateUser } = require('../controllers/users');
const { userValidation, userIdValidation } = require('../../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.get('users/:userId', userIdValidation, getUserById);
router.patch('/users/me', userValidation, updateUser);

module.exports = router;
