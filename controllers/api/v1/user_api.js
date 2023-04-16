const User = require('../../../model/user');
const jwt = require('jsonwebtoken');
const env = require("../../../config/environment");
module.exports.createSession= async function(req,res)
{
    try
    {
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password!= req.body.password)
        {
            return res.json(422,
                {
                    message: "Invalid username || password"
                })
        }
        return res.json(200,
            {
                message:"Signed Up!! here is ur token",
                data:
                {
                    token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'1000000'})
                }
            })
}catch(err)
   {
      //req.flash('error',err);
      console.log("Error",err);
      return res.json(500,{
        message:"Internal server error"
      })
   }
    
}