const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const verifyToken = require('../middleware/verifyToken');
const catchAsync = require('../utils/catchAsync');

router.post('/add-to-cart', verifyToken, catchAsync(cartController.addToCart));
router.get('/get-cart', verifyToken, catchAsync(cartController.getCart));
router.post('/update-cart', verifyToken, catchAsync(cartController.updateCart));

module.exports = router;
