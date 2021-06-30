const router = require('express').Router();
const authController = require('./../controllers/authController');

// Sign Up Route
router.post('/register', authController.postSignup);

// Login Route
router.post('/login', authController.postLogin);

module.exports = router;
