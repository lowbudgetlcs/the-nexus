<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import type { Team } from '$lib/types/models';
  import Form from './form.svelte';

  let { toggle = $bindable(), team, id }: { toggle: boolean; team: Team; id: string } = $props();
</script>

<Dialog.Root bind:open={toggle} onOpenChange={(t) => (toggle = t)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Change Team Division</Dialog.Title>
      <Dialog.Description>Transfer {team.name} to a new Division.</Dialog.Description>
    </Dialog.Header>
    <Form bind:toggle {team} {id} />
    <Dialog.Footer>
      <Button type="submit" form="change-division-{id}">Confirm?</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
