const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const fs = require('fs-extra');
const path = require('path');

const verifyToken = (req, res, next) => {
    const publicKey = fs.readFileSync(
        path.join(__dirname, '../../keys/ec-public-key.pem'),
        'utf-8'
    );
    const token = req.headers.authorization;
    jwt.verify(token, publicKey, async (error, decoded) => {
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
