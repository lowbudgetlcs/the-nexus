<script lang="ts" module>
  import type {
    CreatePlayerFormSchema,
    ChangePlayerTeamFormSchema,
    RemovePlayerTeamFormSchema,
  } from './components/schemas';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { defineCtx } from '$lib/context';
  // Superform getter/setters
  const [getCreatePlayerForm, setCreatePlayerForm] =
    defineCtx<SuperValidated<Infer<CreatePlayerFormSchema>>>();
  const [getChangeTeamForm, setChangeTeamForm] =
    defineCtx<SuperValidated<Infer<ChangePlayerTeamFormSchema>>>();
  const [getRemoveTeamForm, setRemoveTeamForm] =
    defineCtx<SuperValidated<Infer<RemovePlayerTeamFormSchema>>>();
  export const createPlayerForm = getCreatePlayerForm;
  export const changeTeamForm = getChangeTeamForm;
  export const removeTeamForm = getRemoveTeamForm;
  // Dialog target player and toggle states
  export const [getDialogPlayer, setDialogPlayer] = defineCtx<{ player: Player | null }>();
  export const [getChangeTeamToggle, setChangeTeamToggle] = defineCtx<{
    toggle: boolean;
  }>();
  export const [getRemoveTeamToggle, setRemoveTeamToggle] = defineCtx<{
    toggle: boolean;
  }>();
</script>

<script lang="ts">
  import PlayerDataTable from './components/player-data-table.svelte';
  import ChangeTeamDialog from './components/change-team-dialog.svelte';
  import RemoveTeamDialog from './components/remove-team-dialog.svelte';
  import { columns } from './components/columns';
  import type { Player } from '$lib/types/models';

  let { data } = $props();
  let { createPlayerSuperform, changeTeamSuperform, removeTeamSuperform } = data;
  const { players } = $derived(data);
  setCreatePlayerForm(createPlayerSuperform);
  setChangeTeamForm(changeTeamSuperform);
  setRemoveTeamForm(removeTeamSuperform);
  let dialogPlayer = $state({ player: null });
  setDialogPlayer(dialogPlayer);
  let changeTeamToggle = $state({ toggle: false });
  setChangeTeamToggle(changeTeamToggle);
  let removeTeamToggle = $state({ toggle: false });
  setRemoveTeamToggle(removeTeamToggle);
</script>

<section class="flex w-full items-center justify-center">
  {#key players.length}
    <PlayerDataTable data={players} {columns} />
  {/key}
  <ChangeTeamDialog />
  <RemoveTeamDialog />
</section>
