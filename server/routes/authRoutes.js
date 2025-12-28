const express = require('express');
const router = express.Router();

// Import the controller functions
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * Route: POST /api/auth/register
 * Desc: Create a new user account
 */
router.post('/register', registerUser);

/**
 * Route: POST /api/auth/login
 * Desc: Log in an existing user (Now validates role as well)
 */
router.post('/login', loginUser);

module.exports = router;