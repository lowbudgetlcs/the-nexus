<script lang="ts">
  import { Toaster } from '$lib/components/ui/sonner';
  import * as Sidebar from '$lib/components/ui/sidebar';
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import type { LayoutProps } from './$types';

  let { data, children }: LayoutProps = $props();
  let { user } = data;
</script>

<Sidebar.Provider>
  <div class="mr-4 flex">
    <AppSidebar {user} />
    <Sidebar.Trigger class="" />
  </div>
  <main class="h-screen w-screen">
    {@render children?.()}
  </main>
</Sidebar.Provider>

<Toaster />
