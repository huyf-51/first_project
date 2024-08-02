const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');
const verifyToken = require('../middleware/verifyToken');
const catchAsync = require('../utils/catchAsync');

router.get(
    '/get-message/:from/:to',
    verifyToken,
    catchAsync(messageController.getMessage)
);

router.post(
    '/set-message',
    verifyToken,
    catchAsync(messageController.setMessage)
);

module.exports = router;
