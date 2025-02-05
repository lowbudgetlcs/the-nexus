<script lang="ts">
  import type { PageProps } from './$types';
  //   import PlayerTable from './player-table.svelte';
  import DataTable from './data-table.svelte';
  import { columns } from './columns';

  let { data }: PageProps = $props();
  let { players } = data;
</script>

<section class="flex w-full items-center justify-center">
  <DataTable data={players} {columns} />
</section>
