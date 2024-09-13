const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: [String],
        default: [],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    googleId: String,
});

User.post('save', (doc) => {
    console.log('User with id: %s has been saved', doc._id);
});

module.exports = mongoose.model('User', User);
