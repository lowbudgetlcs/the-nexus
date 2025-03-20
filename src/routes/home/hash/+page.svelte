<script lang="ts">
  import HashForm from './hash-form.svelte';
  let { data } = $props();
  let { superform } = data;
</script>

<section class="flex h-full w-full flex-col items-center justify-center">
  <h1 class="text-lg">Password Hash</h1>
  <HashForm {superform} />
</section>
