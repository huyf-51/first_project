const { client } = require('../config/redis');
const AppError = require('../utils/AppError');
const Product = require('../models/Product');

class CartController {
    async addToCart(req, res) {
        const userId = req.userId;
        const { id: productId, quantity } = req.body;
        const existsCart = await client.exists(`cart:${userId.toString()}`);
        if (existsCart) {
            client.hIncrBy(
                `cart:${userId.toString()}`,
                `product:${productId}`,
                quantity
            );
        } else {
            client.hSet(
                `cart:${userId.toString()}`,
                `product:${productId}`,
                quantity
            );
        }
        res.json('success');
    }

    async getCart(req, res, next) {
        const userId = req.userId;
        const existsCart = await client.exists(`cart:${userId.toString()}`);
        if (existsCart) {
            const userRedisCart = await client.hGetAll(
                `cart:${userId.toString()}`
            );
            const userCart = [];

            for (const productId in userRedisCart) {
                const product = await Product.findById(productId.slice(8));
                userCart.push({
                    ...product._doc,
                    quantity: parseInt(userRedisCart[productId]),
                });
            }
            res.json(userCart);
        } else {
            next(new AppError('cannot get cart of this user'));
        }
    }

    async updateCart(req, res) {
        const userId = req.userId;
        const productId = req.body.id;
        const count = req.body.count;

        const result = await client.incrBy(
            `cart:${userId.toString()}`,
            `product:${productId}`,
            count
        );
        res.json('update cart success');
    }
}

module.exports = new CartController();
