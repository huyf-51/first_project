const User = require('../models/User');
const jwt = require('jsonwebtoken');
const genToken = require('../utils/genToken');

class RefreshTokenController {
    async refreshToken(req, res, next) {
        const requestRefreshToken = req.cookies.refreshToken;
        if (!requestRefreshToken) return res.sendStatus(401);
        const foundUser = await User.findOne({
            refreshToken: requestRefreshToken,
        });
        if (!foundUser) {
            return res
                .status(403)
                .clearCookie('refreshToken', {
                    httpOnly: true,
                })
                .json('Not permission');
        }

        const publicKey = fs.readFileSync(
            path.join(__dirname, '../../keys/ec-public-key.pem'),
            'utf-8'
        );

        jwt.verify(requestRefreshToken, publicKey, async (error) => {
            if (error) {
                foundUser.refreshToken = foundUser.refreshToken.filter(
                    (item) => item !== requestRefreshToken
                );
                await foundUser.save();
                return res
                    .status(403)
                    .clearCookie('refreshToken', {
                        httpOnly: true,
                    })
                    .json('Not permission');
            }

            const [accessToken, newRefreshToken] = genToken({
                id: foundUser._id,
            });

            foundUser.refreshToken.push(newRefreshToken);
            await foundUser.save();

            const { password, refreshToken, role, ...otherDetail } =
                foundUser._doc;
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 3600 * 24 * 1000,
            }).json({
                data: otherDetail,
                auth: { accessToken, role },
            });
        });
    }
}

module.exports = new RefreshTokenController();
