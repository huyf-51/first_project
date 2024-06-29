const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: String,
    password: String,
    refreshToken: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    googleId: String,
    username: String,
});

module.exports = mongoose.model('User', User);
