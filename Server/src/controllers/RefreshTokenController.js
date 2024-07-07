const User = require('../models/User');
const jwt = require('jsonwebtoken');

class RefreshTokenController {
    async refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const foundUser = await User.findOne({ refreshToken });

        if (!foundUser) {
            return res
                .sendStatus(403)
                .clearCookie('refreshToken', refreshToken, {
                    httpOnly: true,
                });
        }

        jwt.verify(refreshToken, process.env.refreshToken, async (error) => {
            if (error) {
                foundUser.refreshToken = '';
                return res
                    .sendStatus(403)
                    .clearCookie('refreshToken', refreshToken, {
                        httpOnly: true,
                    });
            }
            const accessToken = jwt.sign(
                { id: foundUser._id },
                process.env.accessToken,
                { expiresIn: '10m' }
            );

            const newRefreshToken = jwt.sign(
                { id: foundUser._id },
                process.env.refreshToken,
                { expiresIn: '1d' }
            );

            foundUser.refreshToken = newRefreshToken;
            const user = await foundUser.save();

            const { password, refreshToken, role, ...otherDetail } =
                foundUser._doc;
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
            }).json({
                data: otherDetail,
                auth: { accessToken, role },
            });
        });
    }
}

module.exports = new RefreshTokenController();
