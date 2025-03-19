<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { createTeamSchema } from './schemas';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { createTeamForm } from '../+page.svelte';
  import { toast } from 'svelte-sonner';

  let formCtx = createTeamForm();
  const form = superForm(formCtx, {
    validators: zodClient(createTeamSchema),
    onUpdated({ form }) {
      if (form.valid) {
        toggle = !toggle;
        toast.success(form.message);
      }
    },
  });
  const { form: formData, enhance } = form;
  let toggle = $state(false);
</script>

<Dialog.Root bind:open={toggle} onOpenChange={(t) => (toggle = t)}>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create Team</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <form method="POST" action="?/create" class="grid gap-4 py-4" use:enhance>
      <Dialog.Header>
        <Dialog.Title>Create Team</Dialog.Title>
        <Dialog.Description>Create a new team in the database.</Dialog.Description>
      </Dialog.Header>
      <Form.Field {form} name="name" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Team Name</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.name} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="col-span-3 col-start-2" />
      </Form.Field>
      <Form.Field {form} name="divisionName" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Division</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.divisionName} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="col-span-3 col-start-2" />
      </Form.Field>
      <Form.Field {form} name="multi" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Multi Link</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.multi} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="col-span-3 col-start-2" />
      </Form.Field>
      <Form.Field {form} name="logo" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Logo</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.logo} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="col-span-3 col-start-2" />
      </Form.Field>
      <Dialog.Footer>
        <Button type="submit">Create Team!</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
