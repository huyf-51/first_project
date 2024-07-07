const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.accessToken, async (error, decoded) => {
        if (error) {
            return next(new AppError('you dont have permission', 403));
        }
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return next(new AppError('you dont have permission', 403));
        }
        req.role = user.role;
        req.userId = user._id;
        next();
    });
};

module.exports = verifyToken;
