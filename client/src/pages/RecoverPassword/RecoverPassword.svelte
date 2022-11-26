<script>
    import { Link } from 'svelte-navigator';
    import { dataset_dev } from 'svelte/internal';
    import { BASE_URL } from "../../store/globals.js";

    let email = ''

    const submit = async () => {
      //FORM
        const response = await fetch(`${$BASE_URL}/api/recoverPassword`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email
            })
        });

        //RESPONSE
        const data = await response.json();

        if (data.response) {
          toastr.info('an email has been sent to your email with more details')
        }
  
    }
</script>

<div class="page">
    <form on:submit|preventDefault={submit}>
      <h1 class="h3 mb-3 fw-normal text-center">Recover password</h1>

      <div class="form-float py-2">
        <input bind:value={email} type="email" class="form-control py-2" id="floatingInput" placeholder="name@example.com">
      </div>
      <div class="form-float py-2">
      <button class="w-100 btn btn-primary m-auto" type="submit">Sign in</button>
      </div>

      <div class="text-center">
        <Link to="/recoverPassword" class="">or go back to the login page</Link>
      </div>
    </form>
</div>