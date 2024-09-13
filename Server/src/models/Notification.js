const mongoose = require('mongoose');

const Notification = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    viewed: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

Notification.post('save', (doc) => {
    console.log('Notification with id: %s has been saved', doc._id);
});

module.exports = mongoose.model('Notification', Notification);
