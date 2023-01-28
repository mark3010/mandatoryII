<script>
  import { UUID, name } from "../../store/auth";
  import { BASE_URL } from "../../store/globals.js";
  import { onMount } from "svelte";
  import { useNavigate } from 'svelte-navigator';
  import StockPrice from "./StockPrice.svelte";

  let stockPriceComponent;
  let updateStockPriceComponent;

  const navigate = useNavigate();

  //LOCAL VARIABLES
  let stockFlag = false;
  let companyName = "missing_companyName"; 
  let ticker = location.pathname.split("/")[2];//"missing_ticker";
  let industry = "missing_industry";
  let posts = [];
  let postsLength = 0;
  let searchInput = "";

  //AUTHENTICATION
  let displayName;
  name.subscribe(n => displayName = n);

  let uuid;
  UUID.subscribe(u => uuid = u);

  //ALL API CALLS
  //let Ticker = location.pathname.split("/")[2];

  async function searchStock(tickerSymbol) {
    navigate(`../${tickerSymbol}`);
    fetchStock(tickerSymbol);
  }

  async function fetchStock(tickerSymbol) {
    let url = `${$BASE_URL}/api/v1/stocks/${tickerSymbol}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

      //success response
      if (response.status === 200) {
        stockFlag = true;

        response.json().then((data) => {
          companyName = data.companyName;
          industry = data.sector;
          ticker = data.symbol;
        })

        fetchComments(tickerSymbol)
      } else {
        response.json().then((data) => {
                toastr["error"](data.message);
            });
      }
  }

  async function fetchComments(tickerSymbol)  {

    let url = `${$BASE_URL}/api/v1/stocks/${tickerSymbol}/posts?sortBy=new`;
    const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

    //success response
    if (response.status === 200) {
        //get posts      
        response.json().then((data) => {
            posts = data.posts;
            posts = posts

            postsLength = data.posts.length;
            postsLength = postsLength;
        });
    } else {
        toastr["error"](`the stock \"${tickerSymbol}\" does not appear to have a comment section, contact support`)
    }
  }

  //COMMENTS
  let contentPost;
  
  const post = async () => {

    //create json
    const json = {
      "content": contentPost,
      "ticker" : ticker,
      "UUID": uuid,
      "name": displayName,

      "replies": [],
    };

    //form
    const response = await fetch(`${$BASE_URL}/api/v1/stocks/${ticker}/posts`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(json)
    });

    if (response.status === 200) {
      response.json().then((data) => {
        json._id = data.postId
        json.createdAt = new Date().toDateString()

        posts.unshift(json)
        posts = posts
        postsLength++;
      });
    }
  }

  //REPLIES
  const reply = async (postId) => {
    const contentReply = document.getElementById(`${postId}_reply`).value;

    const json = {
      "content": contentReply,
      "ticker" : ticker,
      "UUID": uuid,
      "name": displayName
    };

    const response = await fetch(`${$BASE_URL}/api/v1/stocks/${ticker}/posts/${postId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',

        body: JSON.stringify(json)
    });

    if (response.status === 200) {
      response.json().then((data) => {
        json._id = data.postId  
        json.createdAt = new Date().toDateString()

        for (let element of posts) {
          if (element._id === postId) {
            element.replies.unshift(json)
            posts = posts
            break;
          }
        }

      });
    }
  }

  onMount(() => {
    fetchStock(ticker);

    //create function to update socket, hacky solution, needs more work
    updateStockPriceComponent = function() {
      stockPriceComponent.refreshSocket();
    }

  });

</script>

<div class="column " style= "width: 75%; ">
  <h4 style="text-align:center; margin-top: 30px;"> Quick search</h4>
  <p style="text-align:center;">Stock didn't tick your fancy? search for another</p>

  
  <form on:submit|preventDefault={() => searchStock(searchInput)}>
    <div class="container">
      <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-8">
            <div class="search">
              <i class="fa fa-search"></i>
              <input bind:value={searchInput} type="search" class="form-control" placeholder="Insert ticker symbol $TICKER">
              <button on:click={updateStockPriceComponent} class="btn btn-primary">Search</button>
            </div>
        </div>
      </div>
    </div>
  </form>

{#if stockFlag}
  <hr>
    <div class="container py-10"> 
        <h4 style="text-align:center"> Stock overview</h4>
        <h1>Ticker: {ticker}</h1>
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <StockPrice bind:this={stockPriceComponent}></StockPrice>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Company name</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{companyName}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Sector</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{industry}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-10"> 
        <hr>
        <h4 style="text-align:center">Posts overview (total: {postsLength})</h4>
    
        <form on:submit|preventDefault={post}>
          <p>Let others know about what you think about the stock</p>
      
          <div class="form-float py-2">
            <textarea bind:value={contentPost} class="form-control py-2" id="floatingContent" placeholder="write your post here" style="text-align:left; width:1200px;" required/>
          </div>
      
          <div class="form-float py-2">
          <button class="w-20 btn btn-primary ms-auto" type="submit">post</button>
          </div>
        </form>
        <hr style="color:blue;">

        {#each posts as post} 
        <div class="card" style= "padding-left: 30px; padding-top: 20px; width:1200px;">
          {#if post.UUID !== uuid} 
            <p>POST by: &emsp; <strong>{post.name}</strong> id: {post.UUID}</p>
          {:else} 
            <p style="color:blue">POST by: &emsp; <strong>YOU</strong></p>
          {/if}

          <hr>
          <p>{post.content}</p>
          <p style="color=lightgray;">created at: {post.createdAt}</p>
        </div>
      
        <div style="margin-left:40px; ">
          <div>
            {#if post.UUID !== uuid}
            <form on:submit|preventDefault={() => reply(post._id)}>
              <div class="form-float py-2">
                <textarea class="form-control py-2" id="{post._id}_reply" placeholder="Write a reply" style="text-align:left; width:1200px;" required/>
              </div>
      
              <div class="form-float py-2">
              <button class="w-20 btn btn-primary ms-auto" type="submit">reply</button>
              </div>
            </form>
            {:else}
              <p style="color: lightgray;"> you cannot reply to your own post</p>
            {/if}
            
            {#each post.replies as reply}
            <div class="card" style= "padding-left: 30px; padding-top: 20px; margin-bottom:10px;  width:1200px;">
              {#if reply.UUID !== uuid} 
              <p>REPLY by: &emsp; <strong>{reply.name}</strong> id: {reply.UUID}</p>
              {:else} 
                <p style="color:blue">REPLY by: &emsp; <strong>YOU</strong></p>
              {/if}
              <hr>
              <p>{reply.content}</p>
              <p style="color=lightgray;">created at: {reply.createdAt}</p>
            </div>
            {/each}
            
          </div>
        </div>
        <hr style="color:blue;">
        {/each}
      </div>
        
  {/if}

</div>

<style>
  .column{
    margin-top: auto;

  }

  .search{
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, .1);
    
  }
  
  .search input{
  
   height: 60px;
   text-indent: 25px;
   border: 2px solid #d6d4d4;
  
  
  }
  
  
  .search input:focus{
  
   box-shadow: none;
   border: 2px solid blue;
  
  
  }
  
  .search .fa-search{
  
   position: absolute;
   top: 20px;
   left: 16px;
  
  }
  
  .search button{
  
   position: absolute;
   top: 5px;
   right: 5px;
   height: 50px;
   width: 110px;
   background: blue;
  
  }
  </style>