<script>
    import { Link , useNavigate } from 'svelte-navigator';
    import { authenticated , name} from '../store/auth.js';

    const navigate = useNavigate()
    //AUTHENTICATION
    let auth = false; 
    authenticated.subscribe(a => auth = a);

    let displayName = "user";
    name.subscribe(n => displayName = n)
    //

    const logout = async () => {
        const response = await fetch('http://localhost:8080/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })

        const data = await response.json();

        if (data.response) {
            authenticated.set(false)
            toastr["success"]('You have been logged out succesfully')
            navigate("/", { replace: true });
        }
    }

</script>
<!--
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
    </div>
  </nav>
-->
<nav class="navbar navbar-expand-md navbar-dark bg-secondary">
    
    <div class="container-fluid  bg-dark">
        <Link to="/" class="navbar-brand">
            <img src="logonav.png" width="153" height="40" alt="FinDoc logo" style="margin:10px; margin-left:20px;">
        </Link>
        
        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
                <a class="nav-link dropdown-toggle" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/avatar/defaultavatar.png" width="20" height="20"alt="avatar"class="rounded-circle img-fluid">
                    {displayName}
                  </a>
              <li class="nav-item dropdown ">
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><a class="dropdown-item" href="/user">Profile</a></li>
                  <li><a class="dropdown-item" href="/user/notifications">Notifications</a></li>
                  <hr>
                  <li><a class="dropdown-item" on:click={logout} href="/">Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        
        <!--
        {#if auth}
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
                <Link to="/user" class="nav-link">Welcome {displayName}</Link>
            </li>
        </ul>

        
        {/if}

        
            {#if auth}




                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <Link to="/" class="nav-link" on:click={logout}>Logout</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/user/notifications" class="nav-link">Notifications</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/user" class="nav-link">Profile</Link>
                    </li>
                    
                </ul>
            {:else }
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <Link to="/login" class="nav-link">Log in</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/user" class="nav-link">Profile</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/user/notifications" class="nav-link">Profile</Link>
                    </li>
                </ul>
            {/if}-->
        
    </div>
</nav>
