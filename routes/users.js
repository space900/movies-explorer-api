const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users');
const { validateProfileUpdate } = require('../middlewares/validators');

router.get('/me', getCurrentUser);
router.patch('/me', validateProfileUpdate, updateProfile);

module.exports = router;
