<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import { superForm } from 'sveltekit-superforms';
  import { removeDivisionSchema } from './schemas';
  import { getDialogTeam, getRemoveDivisionToggle, removeDivisionForm } from '../+page.svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { teamName } from '$lib/validation';

  let toggle = getRemoveDivisionToggle();
  let formCtx = removeDivisionForm();
  const form = superForm(formCtx, {
    validators: zodClient(removeDivisionSchema),
    onSubmit({ formData, cancel }) {
      if (dialogTeam.team != null) {
        if (teamName.safeParse(name).success) formData.set('teamName', name ?? '');
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
  let dialogTeam = getDialogTeam();
  let name = $derived(dialogTeam.team?.name);
</script>

<Dialog.Root bind:open={toggle.toggle} onOpenChange={(t) => (toggle.toggle = t)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <form method="POST" action="?/removeDivision" class="grid gap-4 py-4" use:enhance>
      <Dialog.Header>
        <Dialog.Title>Remove from Division</Dialog.Title>
        <Dialog.Description>Remove {name}..</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Button type="submit">Confirm?</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
