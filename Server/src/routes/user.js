const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const catchAsync = require('../utils/catchAsync');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');

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
router.get('/get-admin-id', verifyToken, catchAsync(userController.getAdminId));
router.get(
    '/get-all-user-activate-message/:id',
    verifyToken,
    verifyRole('admin'),
    catchAsync(userController.getAllUserActivateMessage)
);

module.exports = router;
