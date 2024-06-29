module.exports = (err, req, res, next) => {
    console.log('error controller');
    console.log('error message: ', err.message);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
