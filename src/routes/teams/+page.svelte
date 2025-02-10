<script lang="ts" module>
  import { defineService } from '$lib/context';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  const [getCreateTeamForm, setCreateTeamForm] =
    defineService<SuperValidated<Infer<CreateTeamFormSchema>>>();
  export const createTeamForm = getCreateTeamForm;
</script>

<script lang="ts">
  import { columns } from './components/columns';
  import TeamDataTable from './components/team-data-table.svelte';
  import type { CreateTeamFormSchema } from './components/create-team/schema';

  let { data } = $props();
  const { createTeamForm } = data;
  const { teams } = $derived(data);
  setCreateTeamForm(createTeamForm);
</script>

<section class="flex w-full items-center justify-center">
  {#key teams.length}
    <TeamDataTable data={teams} {columns} />
  {/key}
</section>
