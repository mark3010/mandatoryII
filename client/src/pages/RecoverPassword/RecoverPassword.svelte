<script>
  import { Link } from 'svelte-navigator';
  import { dataset_dev } from 'svelte/internal';
  import { BASE_URL } from "../../store/globals.js";

  let email = '';

  const submit = async () => {
    //FORM
      const response = await fetch(`${$BASE_URL}/api/v1/recoverPassword`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
              email
          })
      });

    //success response
      if (response.status === 200) {
        toastr["success"]("recovery information has been sent to your email");
      }
  }
</script>

<div class="align-me">
<div class="col-lg-8">
<div class="card mb-4" style="width: 26rem; margin: 0 auto; float: none; margin-bottom: 10px;">
  <div class="card-body" >
    <form on:submit|preventDefault={submit}>
      <h1 class="h3 mb-3 fw-normal text-center">Recover password</h1>

      <div class="form-float py-2">
        <input bind:value={email} type="email" class="form-control py-2" id="floatingInput" placeholder="name@example.com" style="text-align:center;">
      </div>

      <div class="form-float py-2">
        <button class="w-100 btn btn-primary m-auto" type="submit">submit</button>
        </div>
      <div class="text-center">
        <Link to="/login" class="">or go back to the login page</Link>
      </div>
    </form>
    </div>
</div>
</div>
</div>