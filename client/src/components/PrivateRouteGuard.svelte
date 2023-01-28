<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { authenticated } from "../store/auth";

	const navigate = useNavigate();
	const location = useLocation();

	$: if ($authenticated === "false") {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $authenticated}
	<slot />
{/if}