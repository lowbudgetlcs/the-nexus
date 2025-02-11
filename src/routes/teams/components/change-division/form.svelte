<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { changeDivisionSchema } from './schema';
  import type { Team } from '$lib/types/entities';
  import { changeDivisionForms } from '../../+page.svelte';
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
  let formCtxs = changeDivisionForms();
  const formCtx = formCtxs.filter((f) => f.id === id)[0];
  const form = superForm(formCtx, {
    id: id,
    validators: zodClient(changeDivisionSchema),
    onUpdated({ form }) {
      if (form.valid) {
        toggle = !toggle;
        toast.success(form.message);
      }
    },
  });
  const { form: formData, enhance } = form;
  $formData.teamName = team.name;
</script>

<form
  method="POST"
  id="change-division-{id}"
  action="?/changeDivision"
  class="grid gap-4 py-4"
  use:enhance
>
  <Form.Field {form} name="divisionName" class="grid grid-cols-4 items-center gap-4">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-right">Division</Form.Label>
        <Input {...props} class="col-span-3" bind:value={$formData.divisionName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors class="col-span-3 col-start-2" />
  </Form.Field>
  <Form.Field {form} name="teamName" class="hidden">
    <Form.Control>
      {#snippet children({ props })}
        <Input readonly {...props} type="hidden" bind:value={$formData.teamName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</form>
