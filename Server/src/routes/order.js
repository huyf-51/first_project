const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const verifyToken = require('../middleware/verifyToken');

router.post('/create-order', verifyToken, orderController.createOrder);
router.get(
    '/get-paypal-client-id',
    verifyToken,
    orderController.getPaypalClientId
);
router.post(
    '/create-payment-order/:orderId',
    verifyToken,
    orderController.createPaymentOrder
);
router.post(
    '/confirm-payment-order/:orderID',
    verifyToken,
    orderController.comfirmPaymentOrder
);
router.get('/get-all-order', verifyToken, orderController.getAllOrder);

router.post('/set-payment/:orderId', verifyToken, orderController.setPayment);

module.exports = router;
