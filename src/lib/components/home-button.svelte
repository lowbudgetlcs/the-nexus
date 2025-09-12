<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import Atom from '@lucide/svelte/icons/atom';
  import { buttonVariants } from '$lib/components/ui/button';
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <Sidebar.MenuButton size="lg">
      <a href="/home" class={buttonVariants({ variant: 'ghost' })}>
        <div
          class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
        >
          <Atom class="size-6" />
        </div>
        <span class="text-lg font-semibold">The Nexus</span>
      </a>
    </Sidebar.MenuButton>
  </Sidebar.MenuItem>
</Sidebar.Menu>
