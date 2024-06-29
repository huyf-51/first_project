const mongoose = require('mongoose');

const OrderList = new mongoose.Schema({
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    orderIdList: {
        ref: 'Order',
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
});

module.exports = mongoose.model('OrderList', OrderList);
