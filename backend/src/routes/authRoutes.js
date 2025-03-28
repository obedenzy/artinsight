// backend/src/routes/authRoutes.js
const express = require('express');
const { signupUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); // Protect the profile route

module.exports = router;
