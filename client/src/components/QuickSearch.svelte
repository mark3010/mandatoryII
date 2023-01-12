<script>
    import { useNavigate } from 'svelte-navigator';
    import { BASE_URL } from "../store/globals.js";

    const navigate = useNavigate()
    
    let searchTicker = ''
  
    async function search()  {

        //let ticker = location.pathname.split("/")[2]
        let url = `${$BASE_URL}/v1/stocks/${searchTicker}`

        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })

        //success response
        if (response.status === 200) {
            navigate(`/stock/${searchTicker}`, { replace: true });
        } else {
            toastr["error"](`the stock \"${searchTicker}\" could not be found, are you sure you entered the correct ticker symbol?`)
        }

    }

        //FORM

        //TODO: MAKE REQUEST TO BACKEND
        /*
        const response = await fetch(`${$BASE_URL}/api/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        })
        
        //RESPONSE
        const data = await response.json();
        const from = ($location.state && $location.state.from) || "/";

        if (data.response) {
          toastr.info('login succesful')
          authenticated.set(true)
          name.set(data.name)
          navigate(from, { replace: true });
        }*/

        
    
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