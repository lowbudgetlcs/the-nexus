<script lang="ts" module>
  import type { AddPlayerFormSchema, CreatePlayerFormSchema } from './components/schema';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { defineService } from '$lib/context';
  const [getServiceCPF, serviceCPF] =
    defineService<SuperValidated<Infer<CreatePlayerFormSchema>>>();
  export const createPlayerForm = getServiceCPF;
  const [getServiceAPF, serviceAPF] = defineService<SuperValidated<Infer<AddPlayerFormSchema>>>();
  export const addPlayerForm = getServiceAPF;
</script>

<script lang="ts">
  import PlayerDataTable from './components/player-data-table.svelte';
  import { columns } from './components/columns';

  let { data } = $props();
  let { createPlayerForm, addPlayerForm } = data;
  let { players } = $derived(data);
  serviceCPF(createPlayerForm);
  serviceAPF(addPlayerForm);
</script>

<section class="flex w-full items-center justify-center">
  {#key players.length}
    <PlayerDataTable data={players} {columns} />
  {/key}
</section>
