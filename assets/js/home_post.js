
{
    //method to craete post using sjax.
    let createPost = function()
    {
        let newPostform = $('#new-post-form');
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
                       $('#post-list-conatiner>ul').prepend(newPost);
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
    return $(`<li id="post-${post.id}">
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
<div class = "post-comments">   
<form action="/comments/create" method ="POST">
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
createPost();
}