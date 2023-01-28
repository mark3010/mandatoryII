<script>
    import { useNavigate } from 'svelte-navigator';
    import { BASE_URL } from "../store/globals.js";

    const navigate = useNavigate();
    
    let searchTicker = '';
  
    async function search()  {

        let url = `${$BASE_URL}/api/v1/stocks/${searchTicker}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        //success response
        if (response.status === 200) {
            navigate(`/stock/${searchTicker}`, { replace: true });
        } else {
            response.json().then((data) => {
                toastr["error"](data.message);
            });
        }

    }
</script>

<form on:submit|preventDefault={search}>
    <div class="container">
        <div class="row height d-flex justify-content-center align-items-center">

        <div class="col-md-8">

            <div class="search">
            <i class="fa fa-search"></i>
            <input bind:value={searchTicker} type="text" class="form-control" placeholder="Insert ticker symbol $TICKER">
            <button class="btn btn-primary">Search</button>
            </div>
            
        </div>
        
        </div>
    </div>
</form>

<style>
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