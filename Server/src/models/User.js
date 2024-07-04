const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    refreshToken: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    googleId: String,
});

module.exports = mongoose.model('User', User);
