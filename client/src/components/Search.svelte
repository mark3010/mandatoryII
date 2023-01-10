<script>
    import { useNavigate } from 'svelte-navigator';

    const navigate = useNavigate()
    
    const search = async () => {
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

        navigate("/stock", { replace: true });

    }
</script>

<form on:submit|preventDefault={search}>
    <div class="container">
        <div class="row height d-flex justify-content-center align-items-center">

        <div class="col-md-8">

            <div class="search">
            <i class="fa fa-search"></i>
            <input type="text" class="form-control" placeholder="Insert ticker symbol $TICKER">
            <button class="btn btn-primary">Search</button>
            </div>
            
        </div>
        
        </div>
    </div>
</form>


<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:weight@100;200;300;400;500;600;700;800&display=swap");

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