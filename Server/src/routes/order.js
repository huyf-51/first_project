const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const verifyToken = require('../middleware/verifyToken');
const catchAsync = require('../utils/catchAsync');

router.post(
    '/create-order',
    verifyToken,
    catchAsync(orderController.createOrder)
);
router.get(
    '/get-paypal-client-id',
    verifyToken,
    orderController.getPaypalClientId
);
router.post(
    '/create-payment-order/:orderId',
    verifyToken,
    catchAsync(orderController.createPaymentOrder)
);
router.post(
    '/confirm-payment-order/:orderID',
    verifyToken,
    catchAsync(orderController.comfirmPaymentOrder)
);
router.get(
    '/get-all-order',
    verifyToken,
    catchAsync(orderController.getAllOrder)
);
router.post(
    '/set-payment/:orderId',
    verifyToken,
    catchAsync(orderController.setPayment)
);

module.exports = router;
