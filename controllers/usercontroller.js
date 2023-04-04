const User = require('../model/user');
module.exports.profile = function(req,res)
{
    console.log(req.params.id);
    User.findById(req.params.id,function(err,user)
    {
        if(user)
      {
        console.log(user.name);
        return res.render('user',{
            title:"User | Profile",
            profile_user: user
        })
      }
      else{
        res.redirect('back');
      }
    })
   
}
module.exports.update = function(req,res)
{
    if(req.params.id==req.user.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
        {
            return res.redirect('back');
        })
    }
    else{
        return res.status(400).send(Unauthorize);
    }
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

module.exports.create = async function(req,res)
{
    try
    {
        if(req.body.password != req.body.confirm_password)
        {
          return res.redirect('back');
        }
 let user = await User.findOne({email:req.body.email})
       if(!user)
       {
         await User.create(req.body);
         return res.redirect('/users/sign-in');
       }
       else
       {
         return res.redirect('back');
       }
    }catch(err)
    {
        console.log("Error",err);
    }
   
}

module.exports.createSession=function(req,res)
{
   req.flash('success','Logged in Sucessfully!!');
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
    req.flash('success','Logged out Sucessfully!!');
    res.redirect('/');
}
