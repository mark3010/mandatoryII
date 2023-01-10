<script>
    import { src_url_equal } from 'svelte/internal';
    import Search from '../../components/Search.svelte';
    import { authenticated, name } from '../../store/auth.js';
    import { useNavigate } from 'svelte-navigator';

        //AUTHENTICATION
        let auth = false; 
        authenticated.subscribe(bool => auth = bool);

        let displayName = "user";
        name.subscribe(n => displayName = n)

        //BREADTEXT
        //TODO: pull from other sources later
        let breadText = "FinDoc is a stock tracking platform designed to keep all users accountable. Track your calls, socialize and leave a papertrail easy access and study."
        let callToActionNoLogin = "Does the prospects of this project excite you? You can create an account and start contributing today!"
        let callToActionLoggedIn = "start searching for your favorite stocks now with our stock browser"

        //NAVIGATE
        const navigate = useNavigate()
        const start = async () => {

        navigate("/login", { replace: true });
    }

</script>

<div class="col-lg-8">
    <div class="card mb-4" style="width: 40rem; height: 36rem; margin: 0 auto; float: none; margin-bottom: 10px;">
      <div class="card-body" >
            <div class="column">
                <div class="imgAbt">
                    <img class="rounded mx-auto d-block" src="logohome.png" alt="frontpage logo" style="margin:60px;">
                </div>
            {#if !auth}
                <h3 class="text-center">Welcome</h3>
                <p class="text-center">Are you new to FinDoc?</p>
                <p class="text-center text-wrap" >{breadText}</p>
                <p class="text-center">{callToActionNoLogin}</p>
                <form on:submit|preventDefault={start}>
                    <div class="form-float py-2">
                        <button class="w-100 btn btn-primary m-auto" type="submit">Start now</button>
                    </div>
                </form>
                
            {:else }
                <h3 class="text-center">Welcome back {displayName}</h3>
                <p class="text-center">thank you for contributing to the FinDoc project!</p>
                <p class="text-center text-wrap" >{breadText}</p>
                <p class="text-center">{callToActionLoggedIn}</p>
                <Search></Search>
            {/if}
            </div>
        </div>
    </div>
</div>