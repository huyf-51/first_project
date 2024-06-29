const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    orderItems: [
        {
            productName: String,
            image: String,
            price: Number,
        },
    ],
    shippingAddress: String,
    fullName: String,
    phoneNumber: String,
    totalPrice: Number,
    isPayed: Boolean,
});

module.exports = mongoose.model('Order', Order);
