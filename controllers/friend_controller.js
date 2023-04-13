const Friend = require('../model/friends');
const User = require('../model/user');
module.exports.friendship = async function(req,res)
{
    try{
        let existingFriend= await Friend.findOne({to_user:req.query.id,from_user:req.user.id});
        let fromUser = await User.findById(req.user.id);
        let toUser = await User.findById(req.query.id);
        let deleted = false;
        let removeFriend = false;
       
        if(existingFriend)  
        {
           fromUser.friends.pull(existingFriend._id);
           fromUser.save();
           existingFriend.remove();
           deleted = true;
           removeFriend = true;    
        }
        else{
          let friendship = await Friend.create({
            from_user:req.user.id,
            to_user: req.query.id  
           })
           fromUser.friends.push(friendship);
           fromUser.save();
        }
        if(req.xhr){
           return res.status(200).json({
               deleted : deleted , 
               message : "Request Successful",
           });
       }
       return res.redirect("back" , {
       });
       }catch(err)
              {
               console.log("Error while handling friend",err)
              }
}