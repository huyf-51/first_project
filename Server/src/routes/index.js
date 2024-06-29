const userRouter = require('./user');
const productRouter = require('./product');
const refreshTokenRouter = require('./refreshToken');
const orderRouter = require('./order');

function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/refresh', refreshTokenRouter);
    app.use('/order', orderRouter);
}

module.exports = route;
