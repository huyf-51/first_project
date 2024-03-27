const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require("../../models/User")
require("dotenv").config()

function config() {

    // const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    // const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/user/google/callback",
        passReqToCallback: true,
    },
        function (request, accessToken, refreshToken, profile, done) {
            console.log('handle google strategy');
            User.findOne({googleId: profile.id})
                .then((user) => {
                    if (!user) {
                        User.create({googleId: profile.id, username: profile.displayName})
                            .then(() => {
                                
                            })
                    } else {

                    }
                })
            return done(null, profile);
        }));

    passport.serializeUser(function (user, done) {
        console.log('serial');
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('deserial');
        done(null, user);
    });
}

module.exports = { config }