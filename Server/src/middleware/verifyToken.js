const jwt = require('jsonwebtoken');
const User = require('../models/User');
const appError = require('../utils/appError');

const verifyToken = (req, res, next) => {
    if (req.user) {
        return next();
    }
    const token = req.headers.authorization;
    console.log('token: ', token);
    jwt.verify(token, process.env.accessToken, async (error, decoded) => {
        if (error) {
            console.log('error:', error);
            return next(new appError('you dont have permission', 403));
        }
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            return next(new appError('you dont have permission', 403));
        }
        console.log('role: ', user.role);
        req.role = user.role;
        next();
    });
};

module.exports = verifyToken;
