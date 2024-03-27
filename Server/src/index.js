const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const route = require('../src/routes/index');
const passportGoogle = require('./config/passport');
const session = require('express-session');
const passport = require('passport');
const globalErrorHandler = require('./controllers/ErrorController');
const appError = require('./utils/appError');

app.use(cookieParser());

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3002'],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 10 }));

db.connectDB();

app.use(
    session({
        secret: 'abc',
        resave: false,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            // maxAge: 0,
            // secure: true,
            // sameSite: 'Strict'
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
passportGoogle.config();

route(app);
// const { faker } = require('@faker-js/faker')
// const Product = require('../src/models/Product')
// for (let i = 0; i < 96; i++) {
//   const fakeProduct = new Product()
//   fakeProduct.productName = faker.commerce.productName()
//   fakeProduct.price = faker.commerce.price()
//   fakeProduct.image = faker.image.image()
//   fakeProduct.save()
// }
app.all('*', (req, res, next) => {
    next(new appError(`Api Endpoint ${req.originalUrl} not found`, 404));
});
app.use(globalErrorHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
