<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import type { Player } from '$lib/types/models';
  import Form from './remove-player-team-form.svelte';

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
      <Dialog.Title>Remove from Team</Dialog.Title>
      <Dialog.Description>Remove {player.name} from {player.team}.</Dialog.Description>
    </Dialog.Header>
    <Form bind:toggle {player} {id} />
    <Dialog.Footer>
      <Button type="submit" form="remove-team-{id}">Confirm?</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
