<script>
  import { UUID, name, isAdmin, authenticated } from "../../store/auth";
  import { BASE_URL } from "../../store/globals.js";
  import { onMount } from "svelte";

  import { useNavigate } from 'svelte-navigator';

  const navigate = useNavigate()

  let adminPriviledges;
  isAdmin.subscribe(i => adminPriviledges = i)

  let uuid;
  UUID.subscribe(i => uuid = i)

  //for page
  let _name;
  let _uuid;
  let _isadmin;
  let _ghost;
  let _createdAt;
  
  async function fetchUser() {
    let id = location.pathname.split("/")[2];
    let url = `${$BASE_URL}/api/v1/users/${id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    })
    .then(data => data.json())
    .then(data => {
      _name = data.name;
      _uuid = data.UUID;
      _isadmin = data.admin.toString();
      _ghost = data.ghost.toString();
      _createdAt = data.createdAt;
    })
  }

  async function ghostMe() {
    let id = location.pathname.split("/")[2];
    let url = `${$BASE_URL}/api/v1/users/${id}`;

    const response = await fetch(url, {
    //const response = await fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    if (response.status === 200) {

      if (adminPriviledges === "true") {
        fetchUser();
      } else {
        name.set("");
        UUID.set("");
        isAdmin.set("");
        authenticated.set("false");
        toastr["success"]('Your user have succesfully been ghosted');
        navigate("/", { replace: true });
      }
    }
  }

  onMount(fetchUser);
</script>


<div class="container py-5">
  <div class="column">
  <div class="row">
    <div class="col-lg-4">
      <div class="card mb-4">
        <div class="card-body text-center">
          <img src="/avatar/defaultavatar.png" alt="avatar"
            class="rounded-circle img-fluid" style="width: 150px;">
          {#if _ghost === "false"}
          <p class="text-muted mb-1">Active Member</p>
          {:else}
          <p class="text-muted mb-1">Ghost</p>
          {/if}
          {#if _isadmin !== "true"}
          <p class="text-muted mb-1">Base user</p>
          {:else}
          <p class="text-muted mb-1">Admininistrator</p>
          {/if}
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">ID</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{_uuid}</p>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Alias</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{_name}</p>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Account creation</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{_createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {#if _uuid === uuid || adminPriviledges === "true" && _ghost === "false" }
    {#if adminPriviledges === "true" && _uuid !== uuid} 
      <h1 style="text-align:center; color: red;"> admin priviledges enabled</h1>
    {/if}
  <form on:submit|preventDefault={ghostMe}>
    <div class="col text-center"></div>
    <div class="form-float py-2 text-center">
        <button class="btn btn-primary m-auto" type="submit">Ghost my user</button>
    </div>
  </form>
  {/if}
  </div>
</div>