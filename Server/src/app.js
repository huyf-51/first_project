const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const route = require('./routes/index');
const globalErrorHandler = require('./controllers/ErrorController');
const AppError = require('./utils/AppError');
const morgan = require('morgan');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const setDoc = require('../src/document/swagger');

app.use(helmet());
app.use(
    rateLimit({
        windowMs: 5 * 60 * 1000,
        limit: 10000,
        message: 'Too many request from this IP, please try again in an hour',
    })
);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3002'],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 400000000 }));

setDoc(app);
route(app);

app.all('*', (req, res, next) => {
    next(new AppError(`Api Endpoint ${req.originalUrl} not found`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
