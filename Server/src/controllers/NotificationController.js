const Notification = require('../models/Notification');

class NotificationController {
    async getNotification(req, res) {
        const userId = req.params.id;
        const userNotification = await Notification.find({ userId });
        res.json(userNotification);
    }
    async setViewedNotification(req, res) {
        const id = req.body.id;
        await Notification.updateOne({ _id: id }, { viewed: true });
        res.json('ok');
    }
}

module.exports = new NotificationController();
