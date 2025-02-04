<script lang="ts">
	import type { PageProps } from './$types';
	import LoginForm from './login-form.svelte';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div>
	<section class="flex flex-col items-center justify-center">
		<h1 class="text-2xl">Login</h1>
		<div>
			<LoginForm {data} />
		</div>
	</section>
</div>
