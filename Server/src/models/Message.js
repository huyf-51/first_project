const mongoose = require('mongoose');

const Message = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

Message.post('save', (doc) => {
    console.log('Message with id: %s has been saved', doc._id);
});

module.exports = mongoose.model('Message', Message);
