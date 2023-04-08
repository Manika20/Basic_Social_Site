const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');
//tell passport to use google strategy
passport.use(new googleStrategy(
    {
    clientID:"305957639560-sflhsobi01jca8usulsbudd9p8622ha7.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
   },function(accessToken,refreshToken,profile,done)
   {
           User.findOne({email:profile.emails[0].value}).exec(function(err,user)
           {
            if(err)
            {
                console.log("error in google-strategy-passport",err);
                return;
            }
            console.log(accessToken,refreshToken);
            console.log(profile);
            //if the user already exists set it as req.user.
            if(user)
            { 
                return done(null,user);
            }
            else{
                //if it does not exist create one and set it as req.user
                User.create(
                    {
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes(20).toString('hex')

                    }, function(err,user)
                    {
                        if(err)
                        {
                            console.log("error in creating user",err);
                            return;
                        }
                        return done(null,user);
                    }
                )
            }
           })
   }
   ))
   module.exports = passport;