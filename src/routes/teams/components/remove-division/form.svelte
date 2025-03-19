<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { removeDivisionSchema } from './schema';
  import type { Team } from '$lib/types/models';
  import { removeDivisionForms } from '../../+page.svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';

  let {
    toggle = $bindable(),
    team,
    id,
  }: {
    toggle: boolean;
    team: Team;
    id: string;
  } = $props();
  let formCtxs = removeDivisionForms();
  const formCtx = formCtxs.filter((f) => f.id === id)[0];
  const form = superForm(formCtx, {
    id: id,
    validators: zodClient(removeDivisionSchema),
    onUpdated({ form }) {
      if (form.valid) {
        toggle = !toggle;
        toast.success(form.message);
      }
    },
  });
  const { form: formData, enhance, errors } = form;
  $formData.teamName = team.name;
</script>

<form
  method="POST"
  id="remove-division-{id}"
  action="?/removeDivision"
  class="grid gap-4 py-4"
  use:enhance
>
  <Form.Field {form} name="teamName" class="hidden">
    <Form.Control>
      {#snippet children({ props })}
        {#if $errors.name === 'teamName'}
          <Form.Label class="text-right">Team</Form.Label>
        {/if}
        <Input readonly {...props} bind:value={$formData.teamName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</form>
