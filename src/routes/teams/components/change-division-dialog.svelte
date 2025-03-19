<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { changeDivisionSchema } from './schemas';
  import { changeDivisionForm, getChangeDivisionToggle, getDialogTeam } from '../+page.svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { teamName } from '$lib/validation';

  let toggle = getChangeDivisionToggle();
  let formCtx = changeDivisionForm();
  const form = superForm(formCtx, {
    validators: zodClient(changeDivisionSchema),
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
  const dialogTeam = getDialogTeam();
  const name = $derived(dialogTeam.team?.name);
</script>

<Dialog.Root bind:open={toggle.toggle} onOpenChange={(t) => (toggle.toggle = t)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <form method="POST" action="?/changeDivision" class="grid gap-4 py-4" use:enhance>
      <Dialog.Header>
        <Dialog.Title>Change Team Division</Dialog.Title>
        <Dialog.Description>Transfer {name} to a new Division.</Dialog.Description>
      </Dialog.Header>
      <Form.Field {form} name="divisionName" class="grid grid-cols-4 items-center gap-4">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="text-right">Division</Form.Label>
            <Input {...props} class="col-span-3" bind:value={$formData.divisionName} />
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
