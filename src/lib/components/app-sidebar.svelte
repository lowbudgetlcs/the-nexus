<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import ThemeSwitch from '$lib/components/theme-switch.svelte';
  import { type Icon as IconType } from '@lucide/svelte';
  import ChevronUp from '@lucide/svelte/icons/chevron-up';
  import Atom from '@lucide/svelte/icons/atom';
  import Headset from '@lucide/svelte/icons/headset';
  import UserRound from '@lucide/svelte/icons/user-round';
  import Users from '@lucide/svelte/icons/users-round';
  import Hash from '@lucide/svelte/icons/hash';
  import Shield from '@lucide/svelte/icons/shield-half';
  import type { SessionUser } from '$lib/types/models';
  import Button from './ui/button/button.svelte';

  type SidebarItem = {
    title: string;
    url: string;
    icon: typeof IconType;
  };

  const items: SidebarItem[] = [
    {
      title: 'Players',
      url: '/home/players',
      icon: Headset,
    },
    {
      title: 'Teams',
      url: '/home/teams',
      icon: Users,
    },
    {
      title: 'Divisions',
      url: '',
      icon: Shield,
    },
    {
      title: 'Hashing',
      url: '/home/hash',
      icon: Hash,
    },
  ];

  let { user }: { user: SessionUser } = $props();
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <Sidebar.MenuRow>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="/home" {...props}>
              <Atom size={32} />
              <span>The Nexus</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          <ThemeSwitch />
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.MenuRow>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Resources</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton size="lg">
                {#snippet child({ props })}
                  {@const Icon = item.icon}
                  {#if item.url}
                    <a href={item.url} {...props}>
                      <Icon size={24} />
                      <span>{item.title}</span>
                    </a>
                  {:else}
                    <p {...props}>
                      <Icon size={24} />
                      <span>{item.title}</span>
                    </p>
                  {/if}
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuButton
                {...props}
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <UserRound />
                <span class="text-xl">{user.username}</span>
                <ChevronUp class="ml-auto" />
              </Sidebar.MenuButton>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="top" class="w-[--bits-dropdown-menu-anchor-width]">
            <DropdownMenu.Item>
              <form method="POST" action="/?/logout">
                <Button variant="ghost" type="submit">Sign Out</Button>
              </form>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
