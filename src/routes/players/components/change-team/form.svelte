<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { changePlayerTeamSchema } from './schema';
  import type { Player } from '$lib/types/entities';
  import { changePlayerTeamForms } from '../../+page.svelte';
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
  let formCtxs = changePlayerTeamForms();
  const formCtx = formCtxs.filter((f) => f.id === id)[0];
  const form = superForm(formCtx, {
    id: id,
    validators: zodClient(changePlayerTeamSchema),
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

<form method="POST" id="change-team-{id}" action="?/changeTeam" class="grid gap-4 py-4" use:enhance>
  <Form.Field {form} name="team" class="grid grid-cols-4 items-center gap-4">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-right">Team</Form.Label>
        <Input {...props} class="col-span-3" bind:value={$formData.team} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors class="col-span-3 col-start-2" />
  </Form.Field>
  <Form.Field {form} name="summonerName">
    <Form.Control>
      {#snippet children({ props })}
        {#if $errors.name === 'summonerName'}
        <Form.Label class="text-right">Summoner Name</Form.Label>
        {/if}
        <Input readonly {...props} type="hidden" bind:value={$formData.summonerName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</form>
