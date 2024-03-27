const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

class UserController {
    async login(req, res) {
        console.log('handle login');
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ error: 'Incorrect email or password' });
        }
        bcrypt.compare(
            req.body.password,
            user.password,
            async (err, result) => {
                if (!result) {
                    return res.json({ error: 'Incorrect email or password' });
                }

                const accessToken = jwt.sign(
                    { id: user._id },
                    process.env.accessToken,
                    { expiresIn: '3s' }
                );

                const newRefreshToken = jwt.sign(
                    { id: user._id },
                    process.env.refreshToken,
                    { expiresIn: '1d' }
                );

                user.refreshToken = [...user.refreshToken, newRefreshToken];
                const newUser = await user.save();
                const { password, refreshToken, role, ...otherInfo } =
                    newUser._doc;
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                }).json({
                    data: otherInfo,
                    auth: { accessToken, role },
                });
            }
        );
    }
    async register(req, res) {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email: email });
        if (foundUser) {
            return res.json({ error: 'the email is exist' });
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hash });
        const user = await newUser.save();
        res.json({ message: 'register success' });
    }

    async logout(req, res) {
        console.log('handle logout');
        if (req.user) {
            req.logout(next);
            console.log('session: ', req.session);
            req.session.destroy(() => {
                return res.status(204);
            });
            // req.session = null
            // res.clearCookie() // bug: cannot set header after sent to client
        }
        // if (req.user) {
        //     req.session.user = null
        //     req.session.save(function (err) {
        //         if (err) return next(err)

        //         // regenerate the session, which is good practice to help
        //         // guard against forms of session fixation
        //         req.session.regenerate(function (err) {
        //             if (err) next(err)
        //             return res.status(204)
        //         })
        //     })
        // }

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

        foundUser.refreshToken = foundUser.refreshToken.filter(
            (refresh) => refresh != refreshToken
        );
        const user = await foundUser.save();
        res.clearCookie('refreshToken', refreshToken, {
            httpOnly: true,
        }).sendStatus(204);
    }

    // googleLoginFailed(req, res) {
    //     return res.send('google login failed');
    // }

    // googleLoginSuccess(req, res) {
    //     if (req.user) {
    //         console.log('google login ok');
    //         return res.sendStatus(200);
    //     }
    //     return res.sendStatus(401);
    // }

    async sendCode(req, res) {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log('user not found');
            return res.json({ message: 'Account not found' });
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

        const info = await transporter.sendMail({
            from: '',
            to: req.body.email,
            subject: 'Reset password',
            text: '',
            html: `
                        <div>
                            Your OTP: ${OTP}
                        </div>
                    `,
        });
        user.OTP = OTP;
        console.log('user OTP: ', user.OTP);
        const savedUser = await user.save();
        return res.json({ message: 'send code success' });
    }

    async updatePassword(req, res) {
        const { email, newPassword, code } = req.body;
        const user = await User.findOne({ email: email });
        if (!user || user.OTP !== code)
            return res.json({ message: 'wrong OTP' });
        user.password = await bcrypt.hash(newPassword, 10);
        user.OTP = '';
        const newUser = await user.save();
        console.log('update password success');
        return res.json({ message: 'success' });
    }
}

module.exports = new UserController();
