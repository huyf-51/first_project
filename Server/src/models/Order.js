const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    orderItems: {
        type: [
            {
                productName: {
                    type: String,
                    require: true,
                },
                imageUrl: {
                    type: String,
                    require: true,
                },
                price: {
                    type: Number,
                    require: true,
                },
                quantity: {
                    type: Number,
                    require: true,
                },
            },
        ],
        require: true,
    },
    shippingAddress: {
        type: String,
        require: true,
    },
    fullName: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    totalPrice: {
        type: Number,
        require: true,
    },
    isPayed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Order', Order);
