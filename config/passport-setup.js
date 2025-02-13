const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user,done)=>{
    //the user.id is from the DB. Not, the GoogleId
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    //the id is of the DB. Not, the GoogleId
    User.findById(id).then(user=>{
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},(accessToken, refreshToken, profile, done) => {
        // Verify user presence
        console.log(`Profile - ${JSON.stringify(profile)}`)
        User.findOne({googleId:profile?.id }).then((currentUser)=>{
            if(currentUser){
                done(null,currentUser);
            }else{
                new User({
                    username: profile?.displayName,
                    googleId: profile?.id,
                    thumbnail: profile?._json?.picture
                }).save()
                .then((newUser) =>{
                    done(null,newUser);
                })
            }
        })
    })
);