<script>
    import { Link , useNavigate } from 'svelte-navigator';
    import { authenticated } from '../store/auth.js';

    const navigate = useNavigate()
    //AUTHENTICATION
    let auth = false; 
    authenticated.subscribe(a => auth = a);
    //

    const logout = async () => {
        const response = await fetch('http://localhost:8080/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })

        const data = await response.json();

        if (data.response) {
            console.log("logging out")
            authenticated.set(false)
            navigate("/", { replace: true });
        }
    }
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
        <Link to="/" class="navbar-brand">Home</Link>

        <div>
            {#if auth}
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <Link to="/" class="nav-link" on:click={logout}>Logout</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/database" class="nav-link">Database</Link>
                    </li>
                </ul>
            {:else }
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <Link to="/login" class="nav-link">Login</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/register" class="nav-link">Register</Link>
                    </li>

                </ul>
            {/if}
        </div>
    </div>
</nav>
