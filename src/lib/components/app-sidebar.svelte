<script lang="ts">
  import HomeButton from '$lib/components/home-button.svelte';
  import UserDropdown from '$lib/components/user-dropdown.svelte';
  import ThemeButton from '$lib/components/theme-switcher.svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { Button } from '$lib/components/ui/button';
  import type { SessionUser } from '$lib/server/db/users';
  import type { SidebarData } from '$lib/sidebar';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    user,
    items,
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> & { user: SessionUser; items: SidebarData[] } = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
  <Sidebar.Header>
    <div class="flex flex-row items-center justify-evenly gap-2">
      <HomeButton />
      <ThemeButton />
    </div>
  </Sidebar.Header>
  <Sidebar.Content>
    {#each items as group (group.title)}
      <Sidebar.Group>
        <Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each group.items as item (item.title)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton size="lg" class="p-0" aria-disabled={!item.active}>
                  <Button href={item.url} variant="ghost" class="flex size-full justify-start">
                    <span>{item.title}</span></Button
                  >
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    {/each}
  </Sidebar.Content>
  <Sidebar.Footer>
    <UserDropdown {user} />
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
