<script lang="ts">
  import HashForm from './hash-form.svelte';
  import type { PageProps } from '../$types';
  let { data }: PageProps = $props();
</script>

<section class="flex h-full w-full flex-col items-center justify-center">
  <h1 class="text-lg">Password Hash</h1>
  <HashForm {data} />
</section>
