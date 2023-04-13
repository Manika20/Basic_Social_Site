const Post = require('../model/post')
const Comment = require('../model/comment');
const Like = require('../model/like');
module.exports.toggleLike = async function(req,res)
{
    try
    {
        let likeable;
    let deleted = false;
    let type;
    
    
   if(req.query.type=='Post')
   {
     //console.log("Yes Post");
      likeable = await Post.findById(req.query.id).populate("likes");
      //console.log(likeable);
      type='Post';
   }
   else{
    likeable = await Comment.findById(req.query.id).populate("likes");
    type= 'Comment';
   }
  //console.log('out');
   let existingLike = await Like.findOne({
    user:req.user,            // is user ka
    onModel:req.query.type,  //is type ka
    likeable:req.query.id  //is id pai
   })
   //console.log(existingLike);
   if(existingLike)
   {
    deleted=true;
    likeable.likes.pull(existingLike._id);
    likeable.save();
    existingLike.remove();
    if(req.xhr)
 {
    return res.json(200,{
        type:type,
        deleted:deleted,
        message:"Successfully Liked",
        likeable:likeable,
        like : existingLike
    })
 }
    
  }
  else{
     let newLike = await Like.create(
        {
            user:req.user,
            likeable:req.query.id,
            onModel:req.query.type
        }
    )
    //console.log(newLike);
    likeable.likes.push(newLike._id);
    likeable.save();
    deleted = false;
    if(req.xhr)
    {
       return res.json(200,{
           type:type,
           deleted:deleted,
           message:"Successfully Liked",
           likeable:likeable,
           like : newLike
       })
    }
   
  }
 
 return res.redirect('back');
    }catch(err)
    {
        console.log("Error",err);
        return res.json(500,{
            message:"error occured!!"
        })
    }
    
}