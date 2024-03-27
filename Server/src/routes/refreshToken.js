const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/RefreshTokenController');
const catchAsync = require('../utils/catchAsync');

router.get('/', catchAsync(refreshTokenController.refreshToken));

module.exports = router;
