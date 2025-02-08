<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import type { Player } from '$lib/types/entities';

  let { toggle = $bindable(), player }: { toggle: boolean; player: Player } = $props();
</script>

<Dialog.Root open={toggle} onOpenChange={() => (toggle = !toggle)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Remove player</Dialog.Title>
      <Dialog.Description>Removing {player.name} from a {player.team}.</Dialog.Description>
    </Dialog.Header>
    <form method="POST" id="removePlayerForm" action="?/remove" class="grid gap-4 py-4" use:enhance>
      <input type="hidden" id="player" value={player.name} />
    </form>
    <Dialog.Footer>
      <Button type="submit" form="removePlayerForm">Confirm?</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
