const Message = require('../models/Message');

class MessageController {
    async setMessage(req, res) {
        const message = new Message(req.body);
        await message.save();
        res.json('create message success');
    }

    async getMessage(req, res) {
        const { from, to } = req.params;
        const messages = await Promise.all([
            ...(await Message.find({ from: from, to: to })),
            ...(await Message.find({ from: to, to: from })),
        ]);
        messages.sort((a, b) => a.updatedAt - b.updatedAt);
        res.json(messages);
    }
}

module.exports = new MessageController();
