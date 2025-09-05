<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import type { SessionUser } from '$lib/server/db/users';
  import { Button } from '$lib/components/ui/button';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import User from '@lucide/svelte/icons/user';

  let { user }: { user: SessionUser } = $props();
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            {...props}
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg">
              <User class="size-4" />
            </div>
            <span class="font-semibold">{user.username}</span>
            <ChevronsUpDownIcon class="ml-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)" align="start">
        <DropdownMenu.Item>
          <Button variant="ghost" class="flex size-full justify-start" type="submit" form="sign-out"
            >Sign Out</Button
          >
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
  <form id="sign-out" method="POST" action="/?/logout"></form>
</Sidebar.Menu>
