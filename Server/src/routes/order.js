const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const verifyToken = require('../middleware/verifyToken');
const catchAsync = require('../utils/catchAsync');
const verifyRole = require('../middleware/verifyRole');

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
    catchAsync(orderController.confirmPaymentOrder)
);
router.post(
    '/confirm-order/:id',
    verifyToken,
    verifyRole('admin'),
    catchAsync(orderController.confirmOrder)
);
router.get(
    '/get-all-user-order',
    verifyToken,
    catchAsync(orderController.getAllUserOrder)
);
router.get(
    '/get-all-order',
    verifyToken,
    verifyRole('admin'),
    catchAsync(orderController.getAllOrder)
);
router.delete(
    '/delete-order/:id',
    verifyToken,
    catchAsync(orderController.deleteOrder)
);
router.get(
    '/get-order-by-id/:id',
    verifyToken,
    verifyRole('admin'),
    catchAsync(orderController.getOrderById)
);
router.post(
    '/set-payment/:orderId',
    verifyToken,
    catchAsync(orderController.setPayment)
);

module.exports = router;
