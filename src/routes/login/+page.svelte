<script lang="ts">
  import LoginForm from './login-form.svelte';
  let { data } = $props();
  const { superform } = data;
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div>
  <section class="flex flex-col items-center justify-center">
    <h1 class="text-2xl">Login</h1>
    <div>
      <LoginForm {superform} />
    </div>
  </section>
</div>
