<script lang="ts" module>
  type SidebarItem = {
    title: string;
    url: string;
    active: boolean;
  };

  type SidebarData = {
    title: string;
    url: string;
    items: SidebarItem[];
  };
  const navMain: SidebarData[] = [
    {
      title: 'Rosters',
      url: '#',
      items: [
        {
          title: 'Events',
          url: '/home/events',
          active: false,
        },
        {
          title: 'Teams',
          url: '/home/teams',
          active: false,
        },
        {
          title: 'Players',
          url: '/home/players',
          active: false,
        },
      ],
    },
    {
      title: 'Administration',
      url: '#',
      items: [
        {
          title: 'Users',
          url: '/admin/user',
          active: false,
        },
        {
          title: 'Dennys Settings',
          url: '/admin/user',
          active: false,
        },
      ],
    },
  ];
</script>

<script lang="ts">
  import HomeButton from '$lib/components/home-button.svelte';
  import UserDropdown from '$lib/components/user-dropdown.svelte';
  import ThemeButton from '$lib/components/theme-switcher.svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { Button } from '$lib/components/ui/button';
  import type { SessionUser } from '$lib/server/db/users';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    user,
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> & { user: SessionUser } = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
  <Sidebar.Header>
    <div class="flex flex-row items-center justify-evenly gap-2">
      <HomeButton />
      <ThemeButton />
    </div>
  </Sidebar.Header>
  <Sidebar.Content>
    {#each navMain as group (group.title)}
      <Sidebar.Group>
        <Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each group.items as item (item.title)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton size="lg">
                  <Button href={item.url} variant="ghost" disabled={!item.active}
                    >{item.title}</Button
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
