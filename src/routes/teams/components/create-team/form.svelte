<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { createTeamSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { createTeamForm } from '../../+page.svelte';
  import { toast } from 'svelte-sonner';

  let { toggle = $bindable() }: { toggle: boolean } = $props();
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
</script>

<form method="POST" id="create-team-form" action="?/create" class="grid gap-4 py-4" use:enhance>
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
</form>
