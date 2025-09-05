<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar';
  import { Separator } from '$lib/components/ui/separator';
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import type { LayoutProps } from './$types';

  let { data, children }: LayoutProps = $props();
  const user = data.user;
  const items = data.sidebarItems;
</script>

<Sidebar.Provider>
  <AppSidebar {user} {items} />
  <div class="flex flex-1 flex-col">
    <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Sidebar.Trigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4">
      {@render children?.()}
    </div>
  </div>
</Sidebar.Provider>
<Toaster />
