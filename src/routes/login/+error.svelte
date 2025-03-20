<script lang="ts">
  import { page } from '$app/state';

  const status = page.status;
  const message = page.error?.message || 'Something went wrong.';
</script>

<svelte:head>
  <title>{status} Error</title>
</svelte:head>

<div
  class="flex h-screen flex-col items-center justify-center bg-background p-4 text-center text-foreground"
>
  <h1 class="text-5xl font-extrabold text-destructive">Oops!</h1>
  <p class="mt-2 text-lg text-muted-foreground">Something went wrong.</p>
  <p class="mt-4 text-xl font-bold">Status Code: {status}</p>
  <p class="text-md mt-1 italic text-secondary-foreground">{message}</p>
</div>
