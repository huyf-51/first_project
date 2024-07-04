const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    imageUrl: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    productName: {
        type: String,
        require: true,
    },
    inStock: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Product', Product);
