const express = require('express');
const { signup, signin, profile, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', authMiddleware, profile);
router.put('/profile', authMiddleware, updateUser);  // Update user profile
router.delete('/profile', authMiddleware, deleteUser);  // Delete user account

module.exports = router;
