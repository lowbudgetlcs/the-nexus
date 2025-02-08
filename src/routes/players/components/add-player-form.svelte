<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { addPlayerSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { addPlayerForm } from '../+page.svelte';

  let formCtx = addPlayerForm();
  const form = superForm(formCtx, {
    validators: zodClient(addPlayerSchema),
  });
  const { form: data, enhance } = form;
</script>

<form method="POST" id="addPlayerForm" action="?/add" class="grid gap-4 py-4" use:enhance>
  <Form.Field {form} name="team" class="grid grid-cols-4 items-center gap-4">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-right">Team</Form.Label>
        <Input {...props} class="col-span-3" bind:value={$data.team} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</form>
