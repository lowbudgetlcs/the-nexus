<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import type { Player } from '$lib/types/entities';
  import Form from './form.svelte';

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
      <Dialog.Title>Change Team</Dialog.Title>
      <Dialog.Description>Transfer {player.name} to an existing team.</Dialog.Description>
    </Dialog.Header>
    <Form bind:toggle {player} {id} />
    <Dialog.Footer>
      <Button type="submit" form="add-player-to-team-{id}">Confirm?</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
