module.exports = (err, req, res, next) => {
    console.log('error stack: ', err.stack);
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({
        message: err.message,
    });
};
