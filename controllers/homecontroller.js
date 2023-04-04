const Post = require('../model/post');
const User = require('../model/user');
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
    let posts = await Post.find({}).populate('user').populate(
        {
            path:'comments',
            populate:{
                path:'user'
            }
        });
        
     
      let users = await User.find({});
       
            
        return res.render('home',
        {
            title:"Codeial || Home",
            posts: posts,
            all_users:users
        })  
 }
 catch(err)
 {
    console.log("Error",err);
 }
  
}
