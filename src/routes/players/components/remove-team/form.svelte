<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { removePlayerTeamSchema } from './schema';
  import type { Player } from '$lib/types/entities';
  import { removePlayerTeamForms } from '../../+page.svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';

  let {
    toggle = $bindable(),
    player,
    id,
  }: {
    toggle: boolean;
    player: Player;
    id: string;
  } = $props();
  let formCtxs = removePlayerTeamForms();
  const formCtx = formCtxs.filter((f) => f.id === id)[0];
  const form = superForm(formCtx, {
    id: id,
    validators: zodClient(removePlayerTeamSchema),
    onUpdated({ form }) {
      if (form.valid) {
        toggle = !toggle;
        toast.success(form.message);
      }
    },
  });
  const { form: formData, enhance, errors } = form;
  $formData.summonerName = player.name;
</script>

<form method="POST" id="remove-team-{id}" action="?/removeTeam" class="grid gap-4 py-4" use:enhance>
  <Form.Field {form} name="summonerName">
    <Form.Control>
      {#snippet children({ props })}
        {#if $errors.name === 'summonerName'}
        <Form.Label class="text-right">Summoner Name</Form.Label>
        {/if}
        <Input readonly {...props} class="hidden" bind:value={$formData.summonerName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</form>
