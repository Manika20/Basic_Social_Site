const Comment = require('../model/comment');
const Post = require('../model/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
var kue = require('kue')
  , queue = kue.createQueue();
//var queue = require('../config/kue');
module.exports.create = async function(req,res)
{
    try
    {
        let post = await Post.findById(req.body.post)
        
        if(post)
        {
           let comment = await Comment.create(
                {
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                })
                 
                post.comments.push(comment);
                post.save();
                comment = await comment.populate('user', 'name email');
                //commentsMailer.newComment(comment);
               let job= queue.create('emails',comment).save(function(err)
                {
                    if(err)
                    {
                        console.log("error in creating queue!",err);
                        return;
                    }
                    console.log(job.id,"manika");
                })
                if(req.xhr)
                {
    // Similar for comments to fetch the user's id!
    
                    return res.status(200).json(

                       {
                        data:{
                          comment : comment
                        },
                        message:"Created comment"
                       }
                       

                    )
                }
                return res.redirect('/');
        }
    }catch(err)
    {
        console.log('Error',err);
    }
   }
module.exports.destroy = function(req,res)
{
    Comment.findById(req.params.id,function(err,comment)
    {
        if(req.user.id== comment.user)
        {
            const postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},function(err,post)
            {  
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
                return res.redirect('back');
            })

        }
        else{
            return res.redirect('back');
        }
    })
}


