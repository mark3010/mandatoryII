<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../store/globals.js";
    import { Link , useNavigate } from 'svelte-navigator';
    let users = [];

    async function fetchUsers() {
        const response = await fetch(`${$BASE_URL}/api/v1/users`);
        
        //success response
        if (response.status === 200) { 
            response.json().then((data) => {
                if (data.length !== 0) {
                    users = data;
                    users = users;
                } 
            })
        } else {
            //should not be possible to retrieve data if no users exist in DB, as you have to be logged in
        }
        
    }

    onMount(fetchUsers);
   
</script>

<div class="column">
    <h3>Here is a list of all users in the database </h3>
    {#each users as user }
        <ul>
            <li>
                <Link to="/user/{user.UUID}">alias: {user.name}, id: {user.UUID}, ghost: {user.ghost}</Link>
            </li>
        </ul>
    {/each}
</div>




