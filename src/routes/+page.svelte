<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<section>
	<h1>The Nexus</h1>
	<p>This is the one-stop shop for managing all of the LBLCS's backend.</p>
	<p>Direct all complaints to ruuffian because it's his fault.</p>
	<form class="justify-self-end" method="POST" action="?/logout">
		<Button type="submit">Logout</Button>
	</form>
</section>
