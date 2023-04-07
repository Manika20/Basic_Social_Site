const Post = require('../../../model/post');
const Comment = require('../../../model/comment');
module.exports.index= async function(req,res)
{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user').populate(
        {
            path:'comments',
            populate:{
                path:'user'
            }
        });
    return res.json(200,{
        message:"List of Post",
        posts:posts
    })
}
module.exports.destroy= async function(req,res)
{
   try{
      let post= await Post.findById(req.params.id)
      
         post.remove();
         await Comment.deleteMany({post:req.param.id})
         
          return res.json(200,
            {
                message:"The post and associted comments deleted!!"

            })
       
         //req.flash('success','Post deleted');
         //return res.redirect('back');
      
      
     
   }catch(err)
   {
      //req.flash('error',err);
      console.log("Error",err);
      return res.json(500,{
        message:"Internal server error"
      })
   }
      
   }