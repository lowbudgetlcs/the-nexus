<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import CreatePlayerForm from './create-player-form.svelte';
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create Player</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create player</Dialog.Title>
      <Dialog.Description>
        Create a new player in the database. Team is optional.
      </Dialog.Description>
    </Dialog.Header>
    <CreatePlayerForm />
    <Dialog.Footer>
      <Button type="submit" form="createPlayerForm">Create Player</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
