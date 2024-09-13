const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');
const catchAsync = require('../utils/catchAsync');
const verifyToken = require('../middleware/verifyToken');

router.get(
    '/get/:id',
    verifyToken,
    catchAsync(notificationController.getNotification)
);
router.post(
    '/set-viewed',
    verifyToken,
    catchAsync(notificationController.setViewedNotification)
);

module.exports = router;
