<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ThemeSwitch from '$lib/components/theme-switch.svelte';
  import { type Icon as IconType } from '@lucide/svelte';
  import Atom from '@lucide/svelte/icons/atom';
  import User from '@lucide/svelte/icons/user-round';
  import Users from '@lucide/svelte/icons/users-round';
  import Hash from '@lucide/svelte/icons/hash';
  import Shield from '@lucide/svelte/icons/shield-half';

  type SidebarItem = {
    title: string;
    url: string;
    icon: typeof IconType
  }

  const items: SidebarItem[] = [
    {
      title: 'Players',
      url: '/home/players',
      icon: User,
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
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <Sidebar.MenuRow>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="/home" {...props}>
              <Atom size={48} />
              <span class="text-xl">The Nexus</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
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
                      <Icon size={48} />
                      <span class="text-xl">{item.title}</span>
                    </a>
                  {:else}
                    <p {...props}>
                      <Icon size={48}/>
                      <span class="text-xl">{item.title}</span>
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
</Sidebar.Root>
