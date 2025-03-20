<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { loginSchema, type LoginSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';

  let { superform }: { superform: SuperValidated<Infer<LoginSchema>> } = $props();
  const form = superForm(superform, {
    validators: zodClient(loginSchema),
  });
  const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/login" use:enhance>
  <Form.Field {form} name="username">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Username</Form.Label>
        <Input {...props} bind:value={$formData.username} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
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
