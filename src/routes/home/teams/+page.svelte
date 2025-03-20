<script lang="ts" module>
  import { defineCtx } from '$lib/context';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  const [getCreateTeamForm, setCreateTeamForm] =
    defineCtx<SuperValidated<Infer<CreateTeamFormSchema>>>();
  const [getRemoveDivisionForm, setRemoveDivisionForm] =
    defineCtx<SuperValidated<Infer<RemoveDivisionFormSchema>>>();
  const [getChangeDivisionForm, setChangeDivisionForm] =
    defineCtx<SuperValidated<Infer<ChangeDivisionFormSchema>>>();
  export const createTeamForm = getCreateTeamForm;
  export const removeDivisionForm = getRemoveDivisionForm;
  export const changeDivisionForm = getChangeDivisionForm;
  // Dialog target player and toggle states
  export const [getDialogTeam, setDialogTeam] = defineCtx<{ team: Team | null }>();
  export const [getCreateTeamToggle, setCreateTeamToggle] = defineCtx<{
    toggle: boolean;
  }>();
  export const [getChangeDivisionToggle, setChangeDivisionToggle] = defineCtx<{
    toggle: boolean;
  }>();
  export const [getRemoveDivisionToggle, setRemoveDivisionToggle] = defineCtx<{
    toggle: boolean;
  }>();
</script>

<script lang="ts">
  import { columns } from './components/columns';
  import TeamDataTable from './components/team-data-table.svelte';
  import type {
    ChangeDivisionFormSchema,
    CreateTeamFormSchema,
    RemoveDivisionFormSchema,
  } from './components/schemas';
  import ChangeDivisionDialog from './components/change-division-dialog.svelte';
  import RemoveDivisionDialog from './components/remove-division-dialog.svelte';
  import type { Team } from '$lib/types/models';
  import CreateTeamDialog from './components/create-team-dialog.svelte';

  let { data } = $props();
  const { createTeamSuperform, changeDivisionSuperform, removeDivisionSuperform } = data;
  const { teams } = $derived(data);
  setCreateTeamForm(createTeamSuperform);
  setRemoveDivisionForm(removeDivisionSuperform);
  setChangeDivisionForm(changeDivisionSuperform);
  let dialogTeam = $state({ team: null });
  setDialogTeam(dialogTeam);
  let createTeamToggle = $state({ toggle: false });
  setCreateTeamToggle(createTeamToggle);
  let changeDivisionToggle = $state({ toggle: false });
  setChangeDivisionToggle(changeDivisionToggle);
  let removeDivisionToggle = $state({ toggle: false });
  setRemoveDivisionToggle(removeDivisionToggle);
</script>

<section class="flex w-full items-center justify-center">
  {#key teams.length}
    <TeamDataTable data={teams} {columns} />
  {/key}
  <CreateTeamDialog />
  <ChangeDivisionDialog />
  <RemoveDivisionDialog />
</section>
