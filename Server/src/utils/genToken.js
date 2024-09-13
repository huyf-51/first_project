const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const path = require('path');

const genToken = (data) => {
    const privateKey = fs.readFileSync(
        path.join(__dirname, '../../keys/ec-private-key.pem'),
        'utf-8'
    );
    const accessToken = jwt.sign(data, privateKey, {
        algorithm: 'ES256',
        expiresIn: '10m',
    });

    const refreshToken = jwt.sign(data, privateKey, {
        algorithm: 'ES256',
        expiresIn: '1d',
    });
    return [accessToken, refreshToken];
};

module.exports = genToken;
