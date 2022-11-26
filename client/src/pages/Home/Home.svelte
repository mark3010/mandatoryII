<script>
    import { authenticated } from '../../store/auth.js';

        //AUTHENTICATION
        let auth = false; 
        authenticated.subscribe(bool => auth = bool);
        //

</script>

<div class="column">
{#if !auth}
    
    <h3>Homepage</h3>
    <p>Proceed to login, if you dare...</p>
{:else }
    <h3>Homepage</h3>
    <p>your session is authenticated and you are logged in</p>
{/if}
</div>