const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    image: String,
    price: Number,
    productName: String,
});

module.exports = mongoose.model('Product', Product);
