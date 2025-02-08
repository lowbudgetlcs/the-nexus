<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import type { Player } from '$lib/types/entities';
  import AddPlayerForm from './add-player-form.svelte';

  let { toggle = $bindable(), player }: { toggle: boolean; player: Player } = $props();
</script>

<Dialog.Root open={toggle} onOpenChange={() => (toggle = !toggle)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Add a player</Dialog.Title>
      <Dialog.Description>Add {player.name} to an existing team.</Dialog.Description>
    </Dialog.Header>
    <AddPlayerForm />
    <Dialog.Footer>
      <Button type="submit" form="addPlayerForm">Confirm?</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
