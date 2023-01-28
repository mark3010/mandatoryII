
<script>
    import { BASE_URL } from "../../store/globals.js";
    import { onMount } from "svelte";
    import { UUID } from "../../store/auth";

    let postsFlag = false;
    let posts = [];

    let uuid;
    UUID.subscribe(u => uuid = u);

    async function fetchComments()  {
        let id = location.pathname.split("/")[2];
        let url = `${$BASE_URL}/api/v1/users/${id}/posts?seen=false&sortBy=new`;

        const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })

        //success response
        if (response.status === 200) {
            //get posts      
            response.json().then((data) => {
                if (data.length !== 0) {
                    posts = data;
                    posts = posts
                    postsFlag = true;
                } 
            })
        }
    }

    async function seenComments()  {
        let id = location.pathname.split("/")[2];
        let url = `${$BASE_URL}/api/v1/users/${id}/posts?seen=false&sortBy=new`;

        const response = await fetch(url, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

        //success response
        if (response.status === 200) {
            toastr["success"](`all posts marked as seen`)
            posts=[];
        }
    }

    onMount(fetchComments);

</script>


<div class="column">


</div>
<div class="column " style= "width: 75%; ">
    <h4 style="text-align:center; margin-top: 30px;">New replies</h4>
    <p style="text-align:center;">replies have been added to your posts, you can read them now or save them for later. When done just hit "seen all messages"!</p>
    <hr>
    {#if postsFlag===true}
    <form on:submit|preventDefault={seenComments}>
        <div class="col text-center"></div>
        <div class="form-float py-2 text-center">
            <button class="btn btn-primary m-auto" type="submit">Seen all messages</button>
        </div>
    </form>

    <div class="container py-10"> 
        <hr>
    
        <hr style="color:blue;">

        {#each posts as post} 
        <p> new replies added to your post in stock: {post.ticker}</p>
        <div class="card" style= "padding-left: 30px; padding-top: 20px; width:1200px;">

            {#if post.UUID !== uuid} 
            <p>REPLY by: &emsp; <strong>{post.name}</strong> id: {post.UUID}</p>
            {:else} 
              <p style="color:blue">REPLY by: &emsp; <strong>YOU</strong></p>
            {/if}   

        <!-- <p>POST by: &emsp; <strong>{post.name}</strong> id: {post.UUID}</p> -->
        <hr>
        <p>{post.content}</p>
        <p style="color=lightgray;">created at: {post.createdAt}</p>
        </div>
    
        <div style="margin-left:40px; ">
        <div>
            {#each post.replies as reply}
            <div class="card" style= "padding-left: 30px; padding-top: 20px; margin-bottom:10px;  width:1200px;">

                {#if reply.UUID !== uuid} 
                <p>REPLY by: &emsp; <strong>{reply.name}</strong> id: {reply.UUID}</p>
                {:else} 
                  <p style="color:blue">REPLY by: &emsp; <strong>YOU</strong></p>
                {/if}   

            <!-- <p>REPLY by: &emsp; <strong>{reply.name}</strong> id: {reply.UUID}</p> -->
            <hr>
            <p>{reply.content}</p>
            <p  style="color=lightgray;">created at: {reply.createdAt}</p>
            </div>
            {/each}
            
        </div>
        </div>
        <hr style="color:blue;">
        {/each}
    </div>
    {:else}
        <p style="text-align:center;">You currently don't have any unread messages.</p>
    {/if}
  </div>
