<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { createPlayerSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { createPlayerForm } from '../+page.svelte';

  let formCtx = createPlayerForm();
  const form = superForm(formCtx, {
    validators: zodClient(createPlayerSchema),
  });
  const { form: data, enhance } = form;
</script>

<form method="POST" id="createPlayerForm" action="?/create" class="grid gap-4 py-4" use:enhance>
  <Form.Field {form} name="summonerName" class="grid grid-cols-4 items-center gap-4">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-right">Summoner Name</Form.Label>
        <Input {...props} class="col-span-3" bind:value={$data.summonerName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
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
