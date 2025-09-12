<script lang="ts">
  import { type PageProps } from './$types';
  import DataTable from './data-table.svelte';
  import { columns } from './columns';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Events</title>
</svelte:head>

<section>
  <DataTable data={data.events} {columns} />
</section>
