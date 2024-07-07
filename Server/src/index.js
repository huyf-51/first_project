require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const route = require('../src/routes/index');
const globalErrorHandler = require('./controllers/ErrorController');
const AppError = require('./utils/AppError');
const morgan = require('morgan');
const { connectRedis } = require('../src/config/redis');

app.use(cookieParser());

app.use(morgan('dev'));
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3002'],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 400000000 }));

connectRedis();
connectDB();

route(app);

app.all('*', (req, res, next) => {
    next(new AppError(`Api Endpoint ${req.originalUrl} not found`, 404));
});
app.use(globalErrorHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
