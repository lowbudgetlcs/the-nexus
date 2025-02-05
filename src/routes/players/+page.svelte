<script lang="ts">
  import type { PageProps } from './$types';
  import DataTable from './data-table.svelte';
  import { Button } from '$lib/components/ui/button';
  import { columns } from './columns';

  let { data }: PageProps = $props();
  let { players } = data;
</script>

<section class="flex w-full items-center justify-center">
  <DataTable data={players} {columns} />
</section>
