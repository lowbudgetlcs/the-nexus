<script lang="ts">
  import type { PageProps } from './$types';
  import PlayerDataTable from './components/player-data-table.svelte';
  import { columns } from './components/columns';
  import { setContext } from 'svelte';

  let { data }: PageProps = $props();
  setContext('createPlayerForm', data.form);
</script>

<section class="flex w-full items-center justify-center">
  <PlayerDataTable data={data.players} {columns} />
</section>
