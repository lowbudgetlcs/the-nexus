<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import type { PageProps } from './$types';
  import HashForm from './hash-form.svelte';
  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section class="flex h-full w-full flex-col items-center justify-center">
  <h1 class="mb-4 mt-8 text-2xl font-bold first-letter:text-5xl">The Nexus</h1>
  <div class="flex flex-col items-end">
    <p>This is the one-stop shop for managing all of the LBLCS's backend.</p>
    <form method="POST" action="?/logout">
      <Button type="submit">Logout</Button>
    </form>
  </div>
</section>
<section class="flex h-full w-full flex-col items-center justify-center">
  <h1 class="text-lg">Password Hash</h1>
  <HashForm {data} />
</section>
