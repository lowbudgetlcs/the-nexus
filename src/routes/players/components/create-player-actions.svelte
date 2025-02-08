<script lang="ts">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Player } from '$lib/types/entities';
  import AddToTeamDialog from './add-to-team-dialog.svelte';
  import RemoveFromTeamDialog from './remove-from-team-dialog.svelte';

  let { player }: { player: Player } = $props();
  let addPlayerDialogToggle = $state(false);
  let removePlayerDialogToggle = $state(false);
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
    <DropdownMenu.Item onclick={() => (addPlayerDialogToggle = true)}>Add to team</DropdownMenu.Item
    >
    <DropdownMenu.Item onclick={() => (removePlayerDialogToggle = true)}
      >Remove from team</DropdownMenu.Item
    >
  </DropdownMenu.Content>
</DropdownMenu.Root>
<AddToTeamDialog bind:toggle={addPlayerDialogToggle} {player} />
<RemoveFromTeamDialog bind:toggle={removePlayerDialogToggle} {player} />
