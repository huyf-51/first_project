const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const AppError = require('../utils/AppError');
const { url, oauth2Client } = require('../config/googleOauth2');
const axios = require('axios');
const _ = require('lodash');
const Message = require('../models/Message');
const { v4: uuidv4 } = require('uuid');
const { client } = require('../config/redis');
const genToken = require('../utils/genToken');

class UserController {
    async login(req, res, next) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new AppError('Incorrect email or password', 400));
        }
        bcrypt.compare(
            req.body.password,
            user.password,
            async (err, result) => {
                if (!result) {
                    return next(
                        new AppError('Incorrect email or password', 400)
                    );
                }

                const [accessToken, newRefreshToken] = genToken({
                    id: user._id,
                });

                user.refreshToken.push(newRefreshToken);
                const newUser = await user.save();
                const { password, refreshToken, role, ...otherInfo } =
                    newUser._doc;

                const sessionId = uuidv4();
                await client.hSet(`session:${sessionId}`, {
                    userId: newUser._id.toString(),
                    connected: 'false',
                });
                await client.expire(`session:${sessionId}`, 24 * 3600);

                res.status(200)
                    .cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        maxAge: 3600 * 24 * 1000,
                    })
                    .json({
                        data: otherInfo,
                        auth: { accessToken, role },
                        sessionId: `session:${sessionId}`,
                    });
            }
        );
    }
    async register(req, res, next) {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email: email });
        if (foundUser) {
            return next(new AppError('the email is exist'));
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hash });
        const user = await newUser.save();

        res.status(200).json({ status: 'success' });
    }

    async logout(req, res, next) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(204);
        }

        const foundUser = await User.findOne({ refreshToken: refreshToken });

        if (!foundUser) {
            return res
                .clearCookie('refreshToken', {
                    httpOnly: true,
                })
                .json('logout');
        }

        foundUser.refreshToken = foundUser.refreshToken.filter(
            (item) => item !== refreshToken
        );
        await foundUser.save();
        const activeUser = await client.exists(req.headers.sessionid);
        if (activeUser) {
            await client.del(req.headers.sessionid);
        }
        res.clearCookie('refreshToken', {
            httpOnly: true,
        }).json('logout');
    }

    async sendEmail(req, res, next) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new AppError('Account not found'));
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GOOGLE_APP_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD,
            },
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.TOKEN_RESET_PASSWORD,
            {
                expiresIn: '3m',
            }
        );

        const info = await transporter.sendMail({
            from: '',
            to: req.body.email,
            subject: 'Reset password',
            text: '',
            html: `
                    <div style="border: 1px solid; border-radius: 5px; padding: 20px;margin-right: 600px">
                        <div style="margin-bottom: 20px;">
                            To regain access to the site <a href="${process.env.CLIENT_URL}">Shopping web</a>, click the button:
                        </div>
                        <a 
                            href="${process.env.CLIENT_URL}/user/reset-password/${user._id}/${token}"
                            style="background-color: gray; padding: 4px; text-decoration: none; color: black; border-radius: 4px; cursor: pointer;"
                        >
                        change my password
                        </a>
                        <div style="margin-top: 20px;">
                            You can then enter a new password and reconnect to the site.
                        </div>
                    </div>
                `,
        });
        return res.status(200).json({ status: 'success' });
    }

    async resetPassword(req, res, next) {
        const { newPassword } = req.body;
        const { id, token } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) return next(new AppError('Email is not exist'));
        jwt.verify(
            token,
            process.env.TOKEN_RESET_PASSWORD,
            async (error, decoded) => {
                if (error) {
                    return next(new AppError('you dont have permission'));
                }
                const user = await User.findOne({ _id: decoded.id });
                if (!user) {
                    return next(new AppError('you dont have permission'));
                }
                user.password = await bcrypt.hash(newPassword, 10);
                const newUser = await user.save();
                return res.json({ status: 'success' });
            }
        );
    }

    loginWithGoogle(req, res, next) {
        res.json({ url });
    }

    googleCallback(req, res, next) {
        const { code } = req.query;
        if (!code) {
            return res.redirect(`${process.env.CLIENT_URL}/user/login`);
        }
        req.code = code;
        next();
    }
    async googleSetLogin(req, res, next) {
        const code = req.code;
        const { tokens } = await oauth2Client.getToken(code);
        const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
        );
        const { sub, email } = data;

        let user = await User.findOne({ googleId: sub });
        if (!user) {
            const password = await bcrypt.hash(sub, 10);
            user = new User({ googleId: sub, email, password });
            await user.save();
        }

        const [accessToken, newRefreshToken] = genToken({
            id: user._id,
        });

        user.refreshToken.push(newRefreshToken);
        await user.save();

        const { password, refreshToken, role, ...otherInfo } = user._doc;
        const auth = { accessToken, role };

        const sessionId = uuidv4();
        await client.hSet(`session:${sessionId}`, {
            userId: user._id.toString(),
            connected: 'false',
        });
        await client.expire(`session:${sessionId}`, 24 * 3600);

        res.status(200)
            .cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 3600 * 24 * 1000,
            })
            .redirect(
                `${
                    process.env.CLIENT_URL
                }/google/auth/callback?data=${JSON.stringify(
                    otherInfo
                )}&auth=${JSON.stringify(auth)}&sessionId=session:${sessionId}`
            );
    }

    async getAdminId(req, res) {
        const { _id } = await User.findOne({ role: 'admin' });
        res.json(_id);
    }

    async getAllUserActivateMessage(req, res) {
        const { id } = req.params;
        const userIds = (await Message.find({ to: id })).map((msg) =>
            msg.from.toString()
        );
        let allUserInfo = [];
        (await User.find({ role: 'user' })).map((userInfo) => {
            const user = _.omit(userInfo.toObject(), [
                'password',
                'refreshToken',
                'role',
                'googleId',
            ]);
            if (userIds.includes(user._id.toString())) {
                allUserInfo.push(user);
            }
        });

        res.json(allUserInfo);
    }
}

module.exports = new UserController();
