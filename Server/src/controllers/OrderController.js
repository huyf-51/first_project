require('dotenv').config();
const { PAYPAL_CLIENT_ID } = process.env;
const Order = require('../models/Order');
const OrderList = require('../models/OrderList');
const orderService = require('../services/OrderService');
const AppError = require('../utils/AppError');

class OrderController {
    async createOrder(req, res) {
        const orderList = await OrderList.findOne({ userId: req.userId });
        if (!orderList) {
            const newOrderList = await OrderList.create({ userId: req.userId });
            const newOrder = await Order.create({
                ...req.body,
                isPayed: false,
            });
            newOrderList.orderIdList.push(newOrder._id);
            await newOrderList.save();
            res.json(newOrder._id);
        } else {
            const newOrder = await Order.create({
                ...req.body,
                isPayed: false,
            });
            orderList.orderIdList.push(newOrder._id);
            await orderList.save();
            res.json(newOrder._id);
        }
    }

    async getAllOrder(req, res) {
        const allOrderOfUser = await OrderList.findOne({
            userId: req.userId,
        });
        const orderList = [];
        if (allOrderOfUser) {
            for (const orderId of allOrderOfUser.orderIdList) {
                const order = await Order.findById({ _id: orderId });
                if (order) {
                    orderList.push(order);
                }
            }
        }
        res.json(orderList);
    }

    async setPayment(req, res) {
        const { orderId } = req.params;
        const order = await Order.findById({ _id: orderId });
        if (order) {
            order.isPayed = true;
            await order.save();
            res.json('set payment success');
        } else {
            next(new AppError('order not found'));
        }
    }

    getPaypalClientId(req, res) {
        res.json(PAYPAL_CLIENT_ID);
    }

    async createPaymentOrder(req, res, next) {
        console.log('create payment order');
        try {
            const { orderId } = req.params;
            const order = await Order.findById({ _id: orderId });
            if (order) {
                const cartTotalPrice = order.totalPrice;
                const { jsonResponse, httpStatusCode } =
                    await orderService.createOrder(cartTotalPrice, next);
                res.status(httpStatusCode).json(jsonResponse);
            } else {
                next(new AppError('order not found'));
            }
        } catch (error) {
            console.error('Failed to create order:', error);
            next(new AppError('Failed to create order.'));
        }
    }

    async comfirmPaymentOrder(req, res, next) {
        console.log('confirm payment order');
        try {
            const { orderID } = req.params;
            const { jsonResponse, httpStatusCode } =
                await orderService.captureOrder(orderID, next);
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            console.error('Failed to create order:', error);
            next(new AppError('Failed to capture order.'));
        }
    }
}

module.exports = new OrderController();
