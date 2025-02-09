<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import type { Player } from '$lib/types/entities';
  import AddPlayerToTeamForm from './add-player-to-team-form.svelte';

  let {
    toggle = $bindable(),
    player,
    id,
  }: { toggle: boolean; player: Player; id: string } = $props();
</script>

<Dialog.Root bind:open={toggle} onOpenChange={(t) => (toggle = t)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Add a player</Dialog.Title>
      <Dialog.Description>Add {player.name} to an existing team.</Dialog.Description>
    </Dialog.Header>
    <AddPlayerToTeamForm {toggle} {player} {id} />
    <Dialog.Footer>
      <Button type="submit" form="add-player-to-team-{id}">Confirm?</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
