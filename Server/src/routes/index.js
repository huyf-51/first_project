const userRouter = require('./user');
const productRouter = require('./product');
const refreshTokenRouter = require('./refreshToken');
const orderRouter = require('./order');
const cartRouter = require('./cart');

function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/refresh', refreshTokenRouter);
    app.use('/order', orderRouter);
    app.use('/cart', cartRouter);
}

module.exports = route;
