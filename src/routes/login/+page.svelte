<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from './login-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div>
	<section>
		<h1>Login</h1>
		<LoginForm data={data} />
	</section>
</div>
