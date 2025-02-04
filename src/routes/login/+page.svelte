<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div>
	<section>
		<h1>Login</h1>
		<form method="POST" action="?/login" use:enhance>
			<div>
				<label for="username">Username</label>
				<input type="username" name="username" id="username" required />
			</div>
			<div>
				<label for="password">Password</label>
				<input type="password" name="password" id="password" required />
			</div>
			<div>
				<button type="submit">Login</button>
			</div>
			{#if form?.error}
				<div>
					{form.error}
				</div>
			{/if}
		</form>
	</section>
</div>
