<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../store/globals.js";
    let users = [];

    async function fetchUsers() {
        const response = await fetch(`${$BASE_URL}/api/users`);
        const data = await response.json();
        users = data.data;
    }

    onMount(fetchUsers);
   
</script>

<div class="column">
    <h3>Here is a list of all users in the database </h3>
    {#each users as user }
        <ul>
            <li>
                <p>name: {user.name}, username: {user.username}</p>
            </li>
        </ul>
    {/each}
</div>


