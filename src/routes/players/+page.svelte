<script lang="ts" module>
  import { defineService } from '$lib/context';
  const [getService, service] = defineService<SuperValidated<Infer<CreatePlayerFormSchema>>>();
  export const createPlayerForm = getService;
</script>

<script lang="ts">
  import PlayerDataTable from './components/player-data-table.svelte';
  import { columns } from './components/columns';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { CreatePlayerFormSchema } from './components/schema';
  import type { Player } from '$lib/types/entities';

  let { data } = $props();
  let { players, form } = data;
  service(form);
</script>

<section class="flex w-full items-center justify-center">
  <PlayerDataTable data={players} {columns} />
</section>
