<script lang="ts">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Player } from '$lib/types/models';
  import { getChangeTeamToggle, getDialogPlayer, getRemoveTeamToggle } from '../+page.svelte';

  let {
    player,
  }: {
    player: Player;
  } = $props();
  let changeTeamToggle = getChangeTeamToggle();
  let removeTeamToggle = getRemoveTeamToggle();
  let dialogPlayer = getDialogPlayer();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
        <span class="sr-only">Open menu</span>
        <Ellipsis />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
      <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(player.name)}>
        Copy name
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() =>
          navigator.clipboard.writeText(`${player.name},${player.team},${player.division}`)}
      >
        Copy row
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item
      onclick={() => {
        changeTeamToggle.toggle = !changeTeamToggle.toggle;
        dialogPlayer.player = player;
      }}>Change team</DropdownMenu.Item
    >
    <DropdownMenu.Item
      onclick={() => {
        removeTeamToggle.toggle = !removeTeamToggle.toggle;
        dialogPlayer.player = player;
      }}>Remove from team</DropdownMenu.Item
    >
  </DropdownMenu.Content>
</DropdownMenu.Root>
