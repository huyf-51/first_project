require('dotenv').config();
const { PAYPAL_CLIENT_ID } = process.env;
const Order = require('../models/Order');
const orderService = require('../services/OrderService');
const AppError = require('../utils/AppError');
const { client } = require('../config/redis');
const Product = require('../models/Product');

class OrderController {
    async createOrder(req, res) {
        const userId = req.userId;
        const { orderItems, ...otherOrderDetail } = req.body;
        const simplifyOrderItems = [];
        orderItems.map((item) => {
            simplifyOrderItems.push({
                product: item._id,
                quantity: item.quantity,
            });
        });
        await Order.create({
            ...otherOrderDetail,
            userId,
            orderItems: simplifyOrderItems,
        });
        orderItems.map(async (item) => {
            const product = await Product.findById(item._id);
            await Product.updateOne(
                { _id: item._id },
                { inStock: product.inStock - item.quantity }
            );
        });
        await client.del(`cart:${userId.toString()}`);
        res.json('create order success');
    }

    async getAllUserOrder(req, res) {
        const userId = req.userId;
        const orders = await Order.find({ userId })
            .populate('orderItems.product')
            .exec();

        res.json(orders);
    }

    async getOrderById(req, res) {
        const orderId = req.params.id;
        const order = await Order.findById({ _id: orderId }).populate(
            'orderItems.product'
        );
        res.json(order);
    }

    async getAllOrder(req, res) {
        const allOrders = await Order.find();
        res.json(allOrders);
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
            next(new AppError('Failed to create order.'));
        }
    }

    async confirmOrder(req, res) {
        const orderId = req.params.id;
        const order = await Order.findById({ _id: orderId });
        order.isConfirmed = true;
        await order.save();
        res.json('success');
    }

    async deleteOrder(req, res) {
        const orderId = req.params.id;
        const order = await Order.findById({ _id: orderId });
        await Order.deleteOne({ _id: orderId });
        for (const orderItem of order.orderItems) {
            const product = await Product.findById({ _id: orderItem.product });
            product.inStock += orderItem.quantity;
            await product.save();
        }
        res.json('success');
    }

    async confirmPaymentOrder(req, res, next) {
        try {
            const { orderID } = req.params;
            const { jsonResponse, httpStatusCode } =
                await orderService.captureOrder(orderID, next);
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            next(new AppError('Failed to capture order.'));
        }
    }
}

module.exports = new OrderController();
