const User = require('../model/user');
module.exports.profile = function(req,res)
{
    
    res.render('user',{
        title:"User | Profile"
    })
}
module.exports.signIn= function(req,res)
{
    if(req.isAuthenticated())

    {
        return res.redirect('/users/profile')
    }
   
   return res.render('user_signin',{
        title:"Codeial | SignIn"
    })
}
module.exports.signUp= function(req,res)
{  
   
 
if(req.isAuthenticated())
{
    return res.redirect('/users/profile')
}
    return res.render('user_signup',{
        title:"Codeial | SignUp"
    })

}

module.exports.create = function(req,res)
{
    
    console.log(req.body.password);
    console.log(req.body.confirm_password);
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
          if(err)
          {
            console.log("error in searching!!")
            return;
          }
          if(!user)
          {
            User.create(req.body,function(err,user)
            {
                if(err)
                {
                    console.log("error in creating user");
                    return;
                }
   return res.redirect('/users/sign-in');
            })
          }
          else
          {
            return res.redirect('back');
          }
    })
}

module.exports.createSession=function(req,res)
{
   return res.redirect('/');
}
module.exports.destroySession = function(req,res)
{
    req.logout(function(err)
    {
        if(err)
        {
            return next(err);
        }
    });
    res.redirect('/');
}
