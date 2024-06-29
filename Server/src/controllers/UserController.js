const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const AppError = require('../utils/AppError');
const { url, oauth2Client } = require('../config/googleOauth2');
const axios = require('axios');

class UserController {
    async login(req, res, next) {
        console.log('handle login');
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

                const accessToken = jwt.sign(
                    { id: user._id },
                    process.env.accessToken,
                    { expiresIn: '10m' }
                );

                const newRefreshToken = jwt.sign(
                    { id: user._id },
                    process.env.refreshToken,
                    { expiresIn: '1d' }
                );

                user.refreshToken = newRefreshToken;
                const newUser = await user.save();
                const { password, refreshToken, role, ...otherInfo } =
                    newUser._doc;
                res.status(200)
                    .cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                    })
                    .json({
                        data: otherInfo,
                        auth: { accessToken, role },
                    });
            }
        );
    }
    async register(req, res, next) {
        console.log('handle register');
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

    async logout(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(204);
        }

        const foundUser = await User.findOne({ refreshToken: refreshToken });

        if (!foundUser) {
            return res
                .sendStatus(204)
                .clearCookie('refreshToken', refreshToken, {
                    httpOnly: true,
                });
        }

        foundUser.refreshToken = '';
        const user = await foundUser.save();
        res.clearCookie('refreshToken', refreshToken, {
            httpOnly: true,
        }).sendStatus(204);
    }

    async sendEmail(req, res, next) {
        console.log('handle send mail');
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

    async loginWithGoogle(req, res, next) {
        console.log('google');
        res.json({ url });
    }

    async googleCallback(req, res, next) {
        console.log('callback');
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
        const accessToken = jwt.sign({ id: sub }, process.env.accessToken, {
            expiresIn: '10m',
        });

        const newRefreshToken = jwt.sign(
            { id: sub },
            process.env.refreshToken,
            { expiresIn: '1d' }
        );

        const user = await User.findOne({ googleId: sub });
        if (user) {
            user.refreshToken = newRefreshToken;
            await user.save();
            const { password, refreshToken, role, ...otherInfo } = user._doc;
            const auth = { accessToken, role };
            res.status(200)
                .cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                })
                .redirect(
                    `${
                        process.env.CLIENT_URL
                    }/google/auth/callback?data=${JSON.stringify(
                        otherInfo
                    )}&auth=${JSON.stringify(auth)}`
                );
        } else {
            const newUser = new User({ googleId: sub, email: email });
            console.log('new user: ', newUser);
            newUser.refreshToken = newRefreshToken;
            await newUser.save();
            const { password, refreshToken, role, ...otherInfo } = newUser._doc;
            const auth = { accessToken, role };
            res.status(200)
                .cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                })
                .redirect(
                    `${
                        process.env.CLIENT_URL
                    }/google/auth/callback?data=${JSON.stringify(
                        otherInfo
                    )}&auth=${JSON.stringify(auth)}`
                );
        }
    }
}

module.exports = new UserController();