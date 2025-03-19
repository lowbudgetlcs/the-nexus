<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { changePlayerTeamSchema } from './schemas';
  import { changeTeamForm, getChangeTeamToggle, getDialogPlayer } from '../+page.svelte';
  import { toast } from 'svelte-sonner';
  import { summonerName } from '$lib/validation';
  import { zodClient } from 'sveltekit-superforms/adapters';

  let toggle = getChangeTeamToggle();
  const formCtx = changeTeamForm();
  const form = superForm(formCtx, {
    validators: zodClient(changePlayerTeamSchema),
    onSubmit({ formData, cancel }) {
      if (dialogPlayer.player != null) {
        if (summonerName.safeParse(name).success) formData.set('summonerName', name ?? '');
        else cancel();
      }
    },
    onUpdated({ form }) {
      if (form.valid) {
        toggle.toggle = !toggle.toggle;
        toast.success(form.message);
      }
    },
  });
  const { form: formData, enhance } = form;
  const dialogPlayer = getDialogPlayer();
  const name = $derived(dialogPlayer.player?.name);
</script>

{#if name != null}
  <Dialog.Root bind:open={toggle.toggle} onOpenChange={(t) => (toggle.toggle = t)}>
    <Dialog.Trigger></Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <form method="POST" action="?/changeTeam" class="grid gap-4 py-4" use:enhance>
        <Dialog.Header>
          <Dialog.Title>Change Team</Dialog.Title>
          <Dialog.Description>Transfer {name} to an existing team.</Dialog.Description>
        </Dialog.Header>
        <Form.Field {form} name="team" class="grid grid-cols-4 items-center gap-4">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label class="text-right">Team</Form.Label>
              <Input {...props} class="col-span-3" bind:value={$formData.team} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors class="col-span-3 col-start-2" />
        </Form.Field>
        <Dialog.Footer>
          <Button type="submit">Confirm?</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/if}
