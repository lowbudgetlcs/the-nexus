<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { createPlayerSchema } from './schemas';
  import { createPlayerForm, getCreatePlayerToggle } from '../+page.svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';

  let toggle = getCreatePlayerToggle();
  let formCtx = createPlayerForm();
  const form = superForm(formCtx, {
    validators: zodClient(createPlayerSchema),
    onUpdated({ form }) {
      if (form.valid) {
        toggle.toggle = !toggle.toggle;
        toast.success(form.message);
      }
    },
  });
  const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open={toggle.toggle} onOpenChange={(t) => (toggle.toggle = t)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create player</Dialog.Title>
      <Dialog.Description>
        Create a new player in the database. Team is optional.
      </Dialog.Description>
    </Dialog.Header>
    <form
      method="POST"
      id="create-player-form"
      action="?/create"
      class="grid gap-4 py-4"
      use:enhance
    >
      <Form.Field {form} name="summonerName" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Summoner Name</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.summonerName} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="col-span-3 col-start-2" />
      </Form.Field>
      <Form.Field {form} name="team" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Team</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.team} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="col-span-3 col-start-2" />
      </Form.Field>
    </form>
    <Dialog.Footer>
      <Button type="submit" form="create-player-form">Create Player</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
