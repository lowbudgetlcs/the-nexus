<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { formSchema, type FormSchema } from './hashSchema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  let { superform }: { superform: SuperValidated<Infer<FormSchema>> } = $props();

  const form = superForm(superform, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance, message } = form;
</script>

<form method="POST" action="?/hash" use:enhance>
  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <Input {...props} type="password" bind:value={$formData.password} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
{#if $message}
  <p>Hash: {$message}</p>
{/if}
