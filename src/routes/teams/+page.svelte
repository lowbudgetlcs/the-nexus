<script lang="ts" module>
  import { defineService } from '$lib/context';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  const [getCreateTeamForm, setCreateTeamForm] =
    defineService<SuperValidated<Infer<CreateTeamFormSchema>>>();
  export const createTeamForm = getCreateTeamForm;
  const [getRemoveDivisionForms, setRemoveDivisionForms] =
    defineService<SuperValidated<Infer<RemoveDivisionFormSchema>>[]>();
  export const removeDivisionForms = getRemoveDivisionForms;
</script>

<script lang="ts">
  import { columns } from './components/columns';
  import TeamDataTable from './components/team-data-table.svelte';
  import type { CreateTeamFormSchema } from './components/create-team/schema';
  import type { RemoveDivisionFormSchema } from './components/remove-division/schema';

  let { data } = $props();
  const { createTeamForm, removeDivisionForms } = data;
  const { teams } = $derived(data);
  setCreateTeamForm(createTeamForm);
  setRemoveDivisionForms(removeDivisionForms);
</script>

<section class="flex w-full items-center justify-center">
  {#key teams.length}
    <TeamDataTable data={teams} {columns} />
  {/key}
</section>
