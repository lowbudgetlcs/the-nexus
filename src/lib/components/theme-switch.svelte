<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import Sun from 'svelte-radix/Sun.svelte';
  import Moon from 'svelte-radix/Moon.svelte';
  import { toggleMode } from 'mode-watcher';
</script>

<Button onclick={toggleMode} variant="link">
  <Sun
    size="24"
    class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    size="24"
    class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
</Button>
