<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import type { PageProps } from '../$types';
  import CreatePlayerForm from './create-player-form.svelte';

  let { data }: PageProps = $props();
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
    <CreatePlayerForm id="createPlayer" form={data.form} />
    <Dialog.Footer>
      <Button type="submit" form="createPlayer">Create Player</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
