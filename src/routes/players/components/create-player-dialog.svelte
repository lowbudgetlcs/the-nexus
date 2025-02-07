<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { formSchema, type FormSchema } from './schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();
  const form = superForm(data.form, {
    validators: zodClient(formSchema),
  });
  const { form: formData, enhance } = form;
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
    <form method="POST" id="createPlayer" action="?/create" class="grid gap-4 py-4" use:enhance>
      <Form.Field {form} name="summonerName" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Summoner Name</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.summonerName} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="team" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Team</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.team} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </form>
    <Dialog.Footer>
      <Button type="submit" form="createPlayer">Create Player</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
