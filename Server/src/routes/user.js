const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const catchAsync = require('../utils/catchAsync');

router.post('/login', catchAsync(userController.login));
router.post('/register', catchAsync(userController.register));
router.post('/logout', catchAsync(userController.logout));
router.get('/auth/google', userController.loginWithGoogle);
router.get(
    '/auth/google/callback',
    userController.googleCallback,
    catchAsync(userController.googleSetLogin)
);
router.post('/forgot-password/send-mail', catchAsync(userController.sendEmail));
router.put(
    '/forgot-password/reset/:id/:token',
    catchAsync(userController.resetPassword)
);

module.exports = router;
