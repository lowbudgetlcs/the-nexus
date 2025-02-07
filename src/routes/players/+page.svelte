<script lang="ts">
  import type { PageProps } from './$types';
  import DataTable from './components/data-table.svelte';
  import { columns } from './components/columns';

  let { data }: PageProps = $props();
</script>

<section class="flex w-full items-center justify-center">
  <DataTable data={{ tableData: { data: data.players, columns: columns } }} form={data.form} />
</section>
