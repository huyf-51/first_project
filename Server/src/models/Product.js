const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    inStock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Product', Product);
