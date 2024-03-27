const userRouter = require('./user');
const productRouter = require('./product');
const refreshTokenRouter = require('./refreshToken');

function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/refresh', refreshTokenRouter);
}

module.exports = route;
