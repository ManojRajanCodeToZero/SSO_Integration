const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')

passport.use(new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},/*()=>{
    // passport callback function
    //console.log('Passport call back function fired.');
})*/
    (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('Passport call back function fired.');
        console.log(profile)
    })
);