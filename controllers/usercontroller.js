const User = require('../model/user');
module.exports.profile = function(req,res)
{
    console.log(req.cookies.user_id)
    
   if(req.cookies.user_id)
   {
    console.log(req.cookies.user_id)
       User.findById(req.cookies.user_id,function(err,user)
       {
        console.log(req.cookies.user_id)
        if(user)
        {
            console.log(req.cookies.user_id);
            return res.render('user',{
                title:"User Profile",
                user:user
            });
            
        }
        else
        {
            return res.redirect('/users/sign-in');   
        }
       });
    }
       else{
        return res.redirect('/users/sign-in');
       } 

   }
     
module.exports.signIn= function(req,res)
{
   return res.render('user_signin',{
        title:"Codeial | SignIn"
    })
}
module.exports.signUp= function(req,res)
{
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
    console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,user)
    {
        //console.log(req.body.email);
        if(err)
        {
            console.log("error in searching !!");
        }
        if(user)
        {
            console.log(req.body.email);
            if(user.password!=req.body.password)
            {  
                //console.log(req.body.email);
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }
        else{
            return res.redirect('back');
        }
    })
}

