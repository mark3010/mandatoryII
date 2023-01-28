<script>
    import { Link , useNavigate } from 'svelte-navigator';
    import { authenticated , name, UUID, isAdmin} from '../store/auth.js';
    import { BASE_URL } from "../store/globals.js";

    const navigate = useNavigate()

    //AUTHENTICATION
    let auth; 
    authenticated.subscribe(a => auth = a);

    let displayName;
    name.subscribe(n => displayName = n);

    let uuid;
    UUID.subscribe(u => uuid = u);

    let admin;
    isAdmin.subscribe(i => admin = i);
    //

    const logout = async () => {
        const response = await fetch(`${$BASE_URL}/api/v1/logout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        if (response.status === 200) {
            authenticated.set("false");
            name.set("");
            UUID.set("");
            isAdmin.set("");
            toastr["success"]('You have been logged out succesfully');
            navigate("/", { replace: true });
        }
    }

</script>

<nav class="navbar navbar-expand-md navbar-dark bg-secondary">
    
    <div class="container-fluid  bg-dark">
        <Link to="/" class="navbar-brand">
            <!-- <img src="logonav.png" width="153" height="40" alt="FinDoc logo" style="margin:10px; margin-left:20px;"> -->
            <img src="/default/logonav.png" width="153" height="40" alt="FinDoc logo" style="margin:10px; margin-left:20px;">
        </Link>
        
        {#if auth==="true"}
        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav ms-auto">
                <a class="nav-link dropdown-toggle dropleft" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/avatar/defaultavatar.png" width="20" height="20"alt="avatar"class="rounded-circle img-fluid">
                    {displayName} 
                  </a>
              <li class="nav-item dropdown">
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><Link class="dropdown-item" to="/user/{uuid}" >Profile</Link></li>

                  <li><Link class="dropdown-item" to="/user/{uuid}/messages">Notifications</Link></li>

                  {#if admin === "true"}
                  <hr>
                    <li><Link class="dropdown-item" to="/database">Admin control</Link></li>
                  {/if}
                  <hr>
                  <li><Link class="dropdown-item" on:click={logout} to="/">Log out</Link></li>
                </ul>
              </li>
            </ul>
          </div>

        {:else}
            <ul class="navbar-nav ms-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <Link to="/login" class="nav-link">Log in</Link>
                </li>
            </ul>
        {/if}
    </div>
</nav>
