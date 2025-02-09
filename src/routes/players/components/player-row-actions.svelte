<script lang="ts">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Player } from '$lib/types/entities';
  import AddPlayerToTeamDialog from './change-team/dialog.svelte';
  import RemovePlayerFromTeamDialog from './remove-team/dialog.svelte';

  let { player, id }: { player: Player; id: string } = $props();
  let changeTeamDialogToggle = $state(false);
  let removeTeamDialogToggle = $state(false);
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
    <DropdownMenu.Item onclick={() => (changeTeamDialogToggle = true)}
      >Change team</DropdownMenu.Item
    >
    <DropdownMenu.Item onclick={() => (removeTeamDialogToggle = true)}
      >Remove from team</DropdownMenu.Item
    >
  </DropdownMenu.Content>
</DropdownMenu.Root>
<AddPlayerToTeamDialog bind:toggle={changeTeamDialogToggle} {player} {id} />
<RemovePlayerFromTeamDialog bind:toggle={removeTeamDialogToggle} {player} {id} />
