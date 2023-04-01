const Post = require('../model/post');
module.exports.home=function(req,res)
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

 Post.find({}).populate('user').populate(
    {
        path:'comments',
        populate:{
            path:'user'
        }
    }
 ).exec(function(err,posts)
 {
    return res.render('home',
    {
        title:"Codeial || Home",
        posts: posts
    })
 })
  
}
