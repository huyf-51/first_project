const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

router.post('/login', catchAsync(userController.login));
router.post('/register', catchAsync(userController.register));
router.post('/logout', catchAsync(userController.logout));
router.get(
    '/google/login',
    passport.authenticate('google', { scope: ['profile'] })
);
router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: 'user/google/login/failed',
    })
);
router.get(
    '/google/login/failed',
    catchAsync(userController.googleLoginFailed)
);
router.get('/google/success', catchAsync(userController.googleLoginSuccess));
router.post('/forgotPassword/sendCode', catchAsync(userController.sendCode));
router.put('/forgotPassword/update', catchAsync(userController.updatePassword));

module.exports = router;
