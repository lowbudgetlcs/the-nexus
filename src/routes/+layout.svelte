<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import { Navbar } from '$lib/components';
  const { data, children } = $props();
</script>

<ModeWatcher />
{#if data.render}
  <Toaster />
  <Navbar />
{/if}
{@render children()}
