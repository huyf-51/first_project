const AppError = require('../utils/appError');

const verifyRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return next(new AppError('You dont have permisson', 403));
        }
        next();
    };
};

module.exports = verifyRole;
