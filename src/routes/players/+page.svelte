<script lang="ts" module>
  import type {
    CreatePlayerFormSchema,
    ChangePlayerTeamFormSchema,
    RemovePlayerTeamFormSchema,
  } from './components/schemas';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { defineService } from '$lib/context';
  const [getCreatePlayerForm, setCreatePlayerForm] =
    defineService<SuperValidated<Infer<CreatePlayerFormSchema>>>();
  export const createPlayerForm = getCreatePlayerForm;
  const [getChangePlayerTeamForms, setChangePlayerTeamForms] =
    defineService<SuperValidated<Infer<ChangePlayerTeamFormSchema>>[]>();
  export const changePlayerTeamForms = getChangePlayerTeamForms;
  const [getRemovePlayerTeamForms, setRemovePlayerTeamForms] =
    defineService<SuperValidated<Infer<RemovePlayerTeamFormSchema>>[]>();
  export const removePlayerTeamForms = getRemovePlayerTeamForms;
</script>

<script lang="ts">
  import PlayerDataTable from './components/player-data-table.svelte';
  import { columns } from './components/columns';

  let { data } = $props();
  let { createPlayerForm, changePlayerTeamForms, removePlayerForms } = data;
  const { players } = $derived(data);
  setCreatePlayerForm(createPlayerForm);
  setChangePlayerTeamForms(changePlayerTeamForms);
  setRemovePlayerTeamForms(removePlayerForms);
</script>

<section class="flex w-full items-center justify-center">
  {#key players.length}
    <PlayerDataTable data={players} {columns} />
  {/key}
</section>
