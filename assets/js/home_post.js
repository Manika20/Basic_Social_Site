
{
    //method to craete post using sjax.
    let createPost = function()
    {
        let newPostform = $('#new-post-form');
        console.log( newPostform);
        newPostform.submit(function(e)
        {
            e.preventDefault();
            
            $.ajax(
                {   url: '/post/create',
                    type:'POST',
                    data: newPostform.serialize(),
                    success:function(data)
                    {
                       let newPost = newPostDom(data.data.post);
                       $('#posts-list-conatiner>ul').prepend(newPost);
                       deletePost($('.delete-post-button', newPost));
                       //likePost($('.likes',newPost));
                       //initializing class for every post created.
                        // call the create comment class
                       const obj = new PostComments(data.data.post._id);
                       new ToggleLike($(' .likes', newPost));
                       new Noty({
                        theme: 'relax',
                        text: "Post Published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                        
                       
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
    return $(`<li id="post-${post._id}" >
    <p>
        
        <small>
            <a class ="delete-post-button" href="/post/destroy/${post._id}">
              x
            </a>
            <br>
            <a href="/like/toggle?id=${post._id}&type=Post" class="likes" data-likes="0">
                0 Like
            </a>
          
            
        </small>
            
    ${post.content}
    <small>
        ${post.user.name}
    </small>
    </p>
<div  class="post-comments">   
<form id="post-${ post._id }-comments-form" action="/comments/create" method ="POST">
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
                         new Noty({
                            theme: 'relax',
                            text: "Post  Deleted!",
                            type: 'error',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                         

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
   
    $('.allposts').each(function(){
        
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        //let likeButton = $('.likes',self);
        //console.log(likeButton);
        deletePost(deleteButton);
        //likePost(likeButton);
       
        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
        //console.log(postId) 
        const onj= new PostComments(postId);
        //console.log(onj);
      
        new ToggleLike($(' .likes', self));
        new ToggleLike($(' .comment-likes', self));

    });
}
createPost();
convertPostsToAjax();
//createPost();
//deletePost();
}
