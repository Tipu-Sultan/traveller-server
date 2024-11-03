// routes/authRoutes.js
const express = require('express');
const { register, login, verifyEmail, fetchUserData } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/fetch/:userId', fetchUserData);
router.get('/verify/:token', verifyEmail);


module.exports = router;
