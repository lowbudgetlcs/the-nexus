<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import { superForm } from 'sveltekit-superforms';
  import { removePlayerTeamSchema } from './schemas';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { getDialogPlayer, getRemoveTeamToggle, removeTeamForm } from '../+page.svelte';
  import { summonerName } from '$lib/validation';

  let toggle = getRemoveTeamToggle();
  let formCtx = removeTeamForm();
  const form = superForm(formCtx, {
    validators: zodClient(removePlayerTeamSchema),
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
  const { enhance } = form;
  const dialogPlayer = getDialogPlayer();
  const name = $derived(dialogPlayer.player?.name);
</script>

{#if name != null}
  <Dialog.Root bind:open={toggle.toggle} onOpenChange={(t) => (toggle.toggle = t)}>
    <Dialog.Trigger></Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <form method="POST" action="?/removeTeam" class="grid gap-4 py-4" use:enhance>
        <Dialog.Header>
          <Dialog.Title>Remove from Team</Dialog.Title>
          <!-- Should add team name when I figure out a better solution than
          contexts -->
          <Dialog.Description>Remove {name} from team.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Button type="submit">Confirm?</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/if}
