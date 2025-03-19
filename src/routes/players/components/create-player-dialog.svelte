<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import Form from './create-player-form.svelte';

  let toggle = $state(false);
</script>

<Dialog.Root bind:open={toggle} onOpenChange={(t) => (toggle = t)}>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create Player</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create player</Dialog.Title>
      <Dialog.Description>
        Create a new player in the database. Team is optional.
      </Dialog.Description>
    </Dialog.Header>
    <Form bind:toggle />
    <Dialog.Footer>
      <Button type="submit" form="create-player-form">Create Player</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
