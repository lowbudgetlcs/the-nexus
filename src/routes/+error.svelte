<script lang="ts">
  import { page } from '$app/state';

  const status = page.status;
  const message = page.error?.message || 'Something went wrong.';
</script>

<svelte:head>
  <title>{status} Error</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
  <h1 class="text-6xl font-bold text-red-500">{status}</h1>
  <p class="mt-4 text-xl text-gray-700">{message}</p>
  <a
    href="/"
    class="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow transition hover:bg-blue-700"
  >
    Go Home
  </a>
</div>
