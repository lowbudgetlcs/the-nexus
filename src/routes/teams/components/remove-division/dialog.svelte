<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import type { Team } from '$lib/types/entities';
  import Form from './form.svelte';

  let { toggle = $bindable(), team, id }: { toggle: boolean; team: Team; id: string } = $props();
</script>

<Dialog.Root bind:open={toggle} onOpenChange={(t) => (toggle = t)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Remove a player from a team</Dialog.Title>
      <Dialog.Description>Remove {team.name} from {team.division}.</Dialog.Description>
    </Dialog.Header>
    <Form bind:toggle {team} {id} />
    <Dialog.Footer>
      <Button type="submit" form="remove-division-{id}">Confirm?</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
