<script lang="ts">
  import { page } from '$app/state';

  const status = page.status;
  const message = page.error?.message || 'Something went wrong.';
</script>

<svelte:head>
  <title>{status} Error</title>
</svelte:head>

<div
  class="bg-background text-foreground flex h-screen flex-col items-center justify-center p-4 text-center"
>
  <h1 class="text-destructive text-5xl font-extrabold">Oops!</h1>
  <p class="text-muted-foreground mt-2 text-lg">Something went wrong.</p>
  <a class="mt-4 text-xl font-bold text-blue-400 underline" href="/home">Go Home...</a>
  <p class="text-md text-secondary-foreground mt-1 italic">Status Code: {status}</p>
  <p class="text-md text-secondary-foreground mt-1 italic">{message}</p>
</div>
