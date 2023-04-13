const Post = require('../model/post');
const User = require('../model/user');
const Friend = require('../model/friends')
module.exports.home= async function(req,res)
{
    //console.log(req.cookies);
    //res.cookie('user_id',26);
/*Post.find({},function(err,posts)
{
    if(err)
    {
        console.log("Error in finding posts!!");
        return;
    }
    return res.render('home',{
        title:"Codeial || Home",
        posts:posts

     });
})
 Post.find({}).populate('user').exec(function(err,posts)
 {
    if(err)
    {
        console.log("Error in finding posts!!");
        return;
    }
    return res.render('home',{
        title:"Codeial || Home",
        posts:posts

     });
 })  */

 try
 {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');
        
     
      let users = await User.find({});
      let friends;
     console.log(req.user);
     if(req.user)
     {
      friends = await Friend.find({from_user:req.user.id}).populate(['from_user','to_user']);
       console.log('friends',friends);
     }

        return res.render('home',
        {
            title:"Codeial || Home",
            posts: posts,
            all_users:users,
            friends:friends
        })  
 }
 catch(err)
 {
    console.log("Error",err);
 }
  
}
