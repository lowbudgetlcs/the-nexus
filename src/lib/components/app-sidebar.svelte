<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ThemeSwitch from '$lib/components/theme-switch.svelte';
  import Atom from '@lucide/svelte/icons/atom';
  import User from '@lucide/svelte/icons/user-round';
  import Users from '@lucide/svelte/icons/users-round';
  import Hash from '@lucide/svelte/icons/hash';
  import Shield from '@lucide/svelte/icons/shield-half';

  const items = [
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
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href="/home" class="text-2xl" {...props}><Atom size={64} />The Nexus</a>
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
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  {@const Icon = item.icon}
                  {#if item.url}
                    <a href={item.url} {...props}>
                      <Icon size=64 />
                      <span class="text-2xl">{item.title}</span>
                    </a>
                  {:else}
                    <p {...props}>
                      <Icon />
                      <span class="text-2xl">{item.title}</span>
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
