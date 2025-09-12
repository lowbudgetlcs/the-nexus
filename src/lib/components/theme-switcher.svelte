<script lang="ts">
  import Sun from '@lucide/svelte/icons/sun';
  import Moon from '@lucide/svelte/icons/moon';

  import { toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button';
</script>

<Button onclick={toggleMode} variant="ghost">
  <Sun
    size="24"
    class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    size="24"
    class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
</Button>

