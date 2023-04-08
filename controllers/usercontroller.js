const User = require('../model/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req,res)
{
    
    User.findById(req.params.id,function(err,user)
    {
        if(user)
      {
        
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
module.exports.update = async function(req,res)
{
   
   if(req.params.id==req.user.id)
   {   
           try
           { 
            //console.log('***multe');
               let user = await  User.findById(req.params.id);
               //multer is used to read the file as now we have two methods.
               User.uploadedAvatar(req,res,function(err)
               {
                if(err)
                {
                    console.log('multer error',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file)
                {   
                    
                    if(user.avatar && fs.existsSync(user.avatar))
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    //this is saving the path of the uploaded file into the 
                    // avatar filed of user.
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
               })

               
           }catch(err)
           {
            req.flash('error',err);
            return res.redirect('back');
           }
   }
    
   else
   {
    req.flash('error','Unauthorized');
    return res.status(401).send(Unauthorize);
   }
}
module.exports.signIn= function(req,res)
{
    if(req.isAuthenticated())

    {
        //return res.redirect('/users/profile')
    }
   
   return res.render('user_signin',{
        title:"Codeial | SignIn"
    })
}
module.exports.signUp= function(req,res)
{  
   
 
if(req.isAuthenticated())
{
    //return res.redirect('/users/profile')
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
