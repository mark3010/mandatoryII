<script>
  import { Link, useNavigate, useLocation } from "svelte-navigator";
  import { BASE_URL } from "../../store/globals.js";
  import { authenticated, name, UUID, isAdmin } from "../../store/auth.js";

  const navigate = useNavigate(), location = useLocation();
  let username = "", password = "";

  const submit = async () => {
    //form
    const response = await fetch(`${$BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const from = ($location.state && $location.state.from) || "/"; //return to page you tried to access

    //response
    if (response.status === 200) {
      toastr["success"]("login succesful");

      response.json().then((data) => {
        name.set(data.name);
        UUID.set(data.UUID);
        isAdmin.set(data.admin.toString());
      });

      authenticated.set("true");
      navigate(from, { replace: true });
    } else {
      response.json().then((data) => {
        toastr["error"](data.message);
      });
    }
  };

  //check messages
  
</script>
<div class="align-me">
<div class="col-lg-8">
  <div
    class="card mb-4"
    style="width: 26rem; margin: 0 auto; float: none; margin-bottom: 10px;"
  >
    <div class="card-body">
      <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal text-center">Login</h1>

        <div class="form-float py-2">
          <input
            bind:value={username}
            type="email"
            class="form-control py-2"
            id="floatingInput"
            placeholder="name@example.com"
            style="text-align:center;"
            required
          />
        </div>
        <div class="form-float py-2">
          <input
            bind:value={password}
            type="password"
            class="form-control py-2"
            id="floatingPassword"
            placeholder="password"
            style="text-align:center;"
            required
          />
        </div>
        <div class="form-float py-2">
          <button class="w-100 btn btn-primary m-auto" type="submit"
            >Sign in</button
          >
        </div>
        <div class="text-center">
          <Link to="/register" class=""
            >Don't have an account? register here</Link
          >
        </div>
        <div class="text-center">
          <Link to="/recoverPassword" class=""
            >Or don't remember your password?</Link
          >
        </div>
      </form>
    </div>
  </div>
</div>
</div>
<style>


</style>