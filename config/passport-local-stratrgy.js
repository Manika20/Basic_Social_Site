const User = require('../model/user');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const { Passport } = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//passport.use(new LocalStrategy);
passport.use(new LocalStrategy(
    {
         usernameField:'email',
         passReqToCallback:true
    },
function(req,email,password,done)
{
    User.findOne({email:email},function(err,user)
    {
        if(err)
        {
            req.flash('error',err);
            return done(err);
        }
   if(!user )
   {
       //req.flash('error','Invalid Username/Password');
    return done(null,false);
   }
   if(user.password !=password)
   {
      return res.redirect('/users/sign-up');
   }
   return done(null,user);
    });
}
));
//serealizing the user to decide which keys is to be kept in cookies.
passport.serializeUser(function(user,done)
{
    done(null,user.id);
});


//deserealizing the user to decide which key is to be kept in cookies.
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log("Error !!");
            return done(err);
        }
       return done(null,user);
    })
});
// check if the user is authenticated.
passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    // if the user is not authenticated:
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie and we 
        // r just sending it to the locals for view.
        res.locals.user= req.user;
    }
    next();
}
module.exports = passport;