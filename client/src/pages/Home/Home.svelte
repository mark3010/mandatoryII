<script>
    import { authenticated, name } from '../../store/auth.js';

        //AUTHENTICATION
        let auth = false; 
        authenticated.subscribe(bool => auth = bool);

        let displayName = "user";
        name.subscribe(n => displayName = n)

</script>

<div class="column">
{#if !auth}
    
    <h3>Homepage</h3>
    <p>Proceed to login, if you dare...</p>
{:else }
    <h3>Homepage</h3>
    <p>your session is authenticated and you are logged in as user: {displayName}</p>
{/if}
</div>