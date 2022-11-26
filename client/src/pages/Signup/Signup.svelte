<script>
    import { Link, useNavigate } from 'svelte-navigator';
    import { BASE_URL } from "../../store/globals.js";

    const navigate = useNavigate()

    let name = '', username = '', password = ''

    const submit = async () => {
        //FORM
        const response = await fetch(`${$BASE_URL}/api/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                username,
                password
            })
        });

        //RESPONSE
        const data = await response.json();

        if (data.response) {
            toastr.info('your account has been created')
            navigate("/login", { replace: true });
        }        
    }
</script>

<div class="page">
    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal text-center">Create an account</h1>

        <div class="form-float py-2">
            <input bind:value={name} class="form-control py-2" placeholder="Name" required>
        </div>

        <div class="form-float py-2">
            <input bind:value={username} type="email" class="form-control py-2" placeholder="Email" required>
        </div>

        <div class="form-float py-2">
            <input bind:value={password} type="password" class="form-control py-2" placeholder="Password" required>
        </div>

        <div class="form-float py-2">
            <button class="w-100 btn btn-primary m-auto" type="submit">Submit</button>
        </div>
        <div class="text-center">
            <Link to="/login" class="">Already have an account?</Link>
        </div>
    </form>
</div>