
{
    //method to craete post using sjax.
    let createPost = function()
    {
        let newPostform = $('#new-post-form');
        newPostform.submit(function(e)
        {
            e.preventDefault();
            console.log("manikap");
            $.ajax(
                {   url: '/post/create',
                    type:'POST',
                    data: newPostform.serialize(),
                    success:function(data)
                    {
                       let newPost = newPostDom(data.data.post);
                       $('#posts-list-conatiner>ul').prepend(newPost);
                       deletePost($('.delete-post-button', newPost));
                       //initializing class for every post created.
                        // call the create comment class
                        new PostComments(data.data.post._id);
                       
                    }, 
                    error:function(err)
                    {
                        console.log(error.responeText);
                    }
        
                }
               )
        })
       
    }
 // method to create post using ajax   
 let newPostDom = function(post)
 {
    return $(`<li id="post-${post._id}">
    <p>
        
        <small>
            <a class ="delete-post-button" href="/post/destroy/${post._id}">
              DELETE
            </a>
        </small>
            
    ${post.content}
    <small>
        ${post.user.name}
    </small>
    </p>
<div  class="post-comments">   
<form post-${ post._id }-comments-form action="/comments/create" method ="POST">
<input type="text" name="content" placeholder="Type here to add comment......">
<input type="hidden" name="post" value ="${post._id}">
<input type="submit" value="Add Comment">
</form>
</div>
<div class="post-comment-list">
<ul id="post-comments-${post._id}">
</ul>
</div>
</li>`)
 }

let deletePost =function(deletelink)
{
    $(deletelink).click(function(e)
    {
        e.preventDefault();
        $.ajax(
            {
                type:'GET',
                url: $(deletelink).prop('href'),
                success: function(data)
                {
                         $(`#post-${data.data.post_id}`).remove();
                         

                },
                error: function(err)
                {
                    console.log(error.responeText);
                }
            }
        )
    })
    

}
let convertPostsToAjax = function(){
    console.log("calledajax")
    console.log($('#posts-list-container>ul>li').length);
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        console.log("calledajax")
        deletePost(deleteButton);
        console.log("calledajax")
        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
        console.log("calledajax")
        new PostComments(postId);
        console.log(postId) 
    });
}



createPost();
convertPostsToAjax();
//createPost();
//deletePost();
}
