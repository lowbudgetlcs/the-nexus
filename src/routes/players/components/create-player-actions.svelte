<script lang="ts">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Player } from '$lib/types/entities';

  let { player }: { player: Player } = $props();
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
    <DropdownMenu.Item>Add to team</DropdownMenu.Item>
    <DropdownMenu.Item>Remove from team</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
