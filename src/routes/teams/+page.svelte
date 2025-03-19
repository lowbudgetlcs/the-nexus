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
  export const changeDivisionForms = getChangeDivisionForm;
</script>

<script lang="ts">
  import { columns } from './components/columns';
  import TeamDataTable from './components/team-data-table.svelte';
  import type {
    ChangeDivisionFormSchema,
    CreateTeamFormSchema,
    RemoveDivisionFormSchema,
  } from './components/schemas';

  let { data } = $props();
  const { createTeamSuperform, changeDivisionSuperform, removeDivisionSuperform } = data;
  const { teams } = $derived(data);
  setCreateTeamForm(createTeamSuperform);
  setRemoveDivisionForm(removeDivisionSuperform);
  setChangeDivisionForm(changeDivisionSuperform);
</script>

<section class="flex w-full items-center justify-center">
  {#key teams.length}
    <TeamDataTable data={teams} {columns} />
  {/key}
</section>
