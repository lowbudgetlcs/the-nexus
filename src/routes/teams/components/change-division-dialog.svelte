<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm } from 'sveltekit-superforms';
  import { changeDivisionSchema } from './schemas';
  import type { Team } from '$lib/types/models';
  import { changeDivisionForms } from '../+page.svelte';
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
  const { form: formData, enhance, errors } = form;
  $formData.teamName = team.name;
</script>

<Dialog.Root bind:open={toggle} onOpenChange={(t) => (toggle = t)}>
  <Dialog.Trigger></Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <form method="POST" action="?/changeDivision" class="grid gap-4 py-4" use:enhance>
      <Dialog.Header>
        <Dialog.Title>Change Team Division</Dialog.Title>
        <Dialog.Description>Transfer {team.name} to a new Division.</Dialog.Description>
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
      <Form.Field {form} name="teamName">
        <Form.Control>
          {#snippet children({ props })}
            {#if $errors.name === 'teamName'}
              <Form.Label class="text-right">Team</Form.Label>
            {/if}
            <Input readonly {...props} class="hidden" bind:value={$formData.teamName} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Dialog.Footer>
        <Button type="submit">Confirm?</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
