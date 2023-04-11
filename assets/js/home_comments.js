// Let's implement this via classes
// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
class PostComments
{
    
     constructor(postId)
     {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.createComment(postId);
        
        let self = this;
        // call for all the existing comments
        //But when this keyword is used inside $(), then it becomes a jQuery object,
         //and now we can use all properties of jQuery on this method.
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
        }
        createComment(postId)
        {   
            
            let pself = this;
            this.newCommentForm.submit(function(e)
            {
                e.preventDefault();
                
                let self = this;
                $.ajax(
                    {
                        
                    url:'/comments/create',
                    type:'POST',
                    data:$(self).serialize(),
                    success: function(data)
                    {
                        console.log("manika");
                        let newComment = pself.newCommentDom(data.data.comment);
                        $(`#post-comments-${postId}`).prepend(newComment);
                        pself.deleteComment($(' .delete-comment-button', newComment));
                        new ToggleLike($(' .comment-likes', newComment));
                        new Noty({
                            theme: 'relax',
                            text: "Comment published!",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },
                    error : function(err)
                    {
                        console.log(err.responseText);
                    }

                    }
                )
            })
        }
newCommentDom(comment){
// I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
return $(`<li id="comment-${ comment._id }">
<p>
<small>
<a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
<br>
            <a href="/like/toggle?id=${comment._id}&type=Comment" class="comment-likes" data-likes="0">
                0 Like
            </a>
</small>

                            ${comment.content}
                                <br>
                                <small>
                                    ${comment.user.name}
</small>
</p>    
</li>`);
}
        deleteComment(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();
    
                $.ajax({
                    type: 'GET',
                    url: $(deleteLink).prop('href'),
                    success: function(data){
                        $(`#comment-${data.data.comment_id}`).remove();
                        new Noty({
                            theme: 'relax',
                            text: "Comment Deleted!",
                            type: 'error',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
    
                        
                    },error: function(error){
                        console.log(error.responseText);
                    }
                });
    
            });
        }
    } 
   


    