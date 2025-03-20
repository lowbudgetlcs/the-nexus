<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Team } from '$lib/types/models';
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import { getChangeDivisionToggle, getRemoveDivisionToggle, getDialogTeam } from '../+page.svelte';

  let { team }: { team: Team } = $props();
  let changeDivisionToggle = getChangeDivisionToggle();
  let removeDivisionToggle = getRemoveDivisionToggle();
  let dialogTeam = getDialogTeam();
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
    <DropdownMenu.Item
      onclick={() => {
        changeDivisionToggle.toggle = !changeDivisionToggle.toggle;
        dialogTeam.team = team;
      }}>Change division</DropdownMenu.Item
    >
    <DropdownMenu.Item
      onclick={() => {
        removeDivisionToggle.toggle = !removeDivisionToggle.toggle;
        dialogTeam.team = team;
      }}>Remove from division</DropdownMenu.Item
    >
  </DropdownMenu.Content>
</DropdownMenu.Root>
