const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    image: String,
    price: Number,
    productName: String,
    description: String,
    inStock: Number,
    category: String,
    imageId: String,
});

module.exports = mongoose.model('Product', Product);
