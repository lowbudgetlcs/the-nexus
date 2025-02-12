<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Team } from '$lib/types/entities';
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import ChangeDivisionDialog from './change-division/dialog.svelte';
  import RemoveDivisionDialog from './remove-division/dialog.svelte';

  let { team, id }: { team: Team; id: string } = $props();
  let changeDivisionDialogToggle = $state(false);
  let removeDivisionDialogToggle = $state(false);
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
      <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(team.name)}>
        Copy name
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() =>
          navigator.clipboard.writeText(`${team.name},${team.division},${team.playerCount}`)}
      >
        Copy row
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onclick={() => (changeDivisionDialogToggle = true)}
      >Change division</DropdownMenu.Item
    >
    <DropdownMenu.Item onclick={() => (removeDivisionDialogToggle = true)}
      >Remove from division</DropdownMenu.Item
    >
  </DropdownMenu.Content>
</DropdownMenu.Root>
<ChangeDivisionDialog bind:toggle={changeDivisionDialogToggle} {team} {id} />
<RemoveDivisionDialog bind:toggle={removeDivisionDialogToggle} {team} {id} />
