<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { formSchema, type FormSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';

  let { form: data, id }: { form: SuperValidated<Infer<FormSchema>>; id: string } = $props();
  const form = superForm(data, {
    validators: zodClient(formSchema),
  });
  const { form: formData, enhance } = form;
</script>

<form method="POST" {id} action="?/create" class="grid gap-4 py-4" use:enhance>
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
