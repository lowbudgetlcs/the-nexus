<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { createPlayerSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { createPlayerForm } from '../../+page.svelte';
  import { toast } from 'svelte-sonner';

  let { toggle = $bindable() }: { toggle: boolean } = $props();
  let formCtx = createPlayerForm();
  const form = superForm(formCtx, {
    validators: zodClient(createPlayerSchema),
    onUpdated({ form }) {
      if (form.valid) {
        toggle = !toggle;
        toast.success(form.message);
      }
    },
  });
  const { form: formData, enhance } = form;
</script>

<form method="POST" id="create-player-form" action="?/create" class="grid gap-4 py-4" use:enhance>
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
