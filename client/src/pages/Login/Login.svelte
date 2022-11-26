<script>
    import { Link, useNavigate, useLocation } from 'svelte-navigator';
    import { BASE_URL } from "../../store/globals.js";
    import { authenticated } from '../../store/auth.js';

    const navigate = useNavigate(), location = useLocation();
    let username = '', password = '';

    const submit = async () => {
        //REQUEST FORM
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
          navigate(from, { replace: true });
        }
    }
</script>

<div class="page">
    <form on:submit|preventDefault={submit}>
      <h1 class="h3 mb-3 fw-normal text-center">Login</h1>

      <div class="form-float py-2">
        <input bind:value={username} type="email" class="form-control py-2" id="floatingInput" placeholder="name@example.com">
      </div>
      <div class="form-float py-2">
        <input bind:value={password} type="password" class="form-control py-2" id="floatingPassword" placeholder="Password">
      </div>
      <div class="form-float py-2">
      <button class="w-100 btn btn-primary m-auto" type="submit">Sign in</button>
      </div>

      <div class="text-center">
        <Link to="/recoverPassword" class="">don't remember your password?</Link>
      </div>
    </form>
</div>