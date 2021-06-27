const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.get('/posts', authController.posts);

module.exports = router;