import { zod } from 'sveltekit-superforms/adapters';
import { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { createTeamSchema, removeDivisionSchema, changeDivisionSchema } from './components/schemas';

export const load: PageLoad = async ({ data }) => {
  return {
    teams: data.teams,
    createTeamForm: await superValidate(zod(createTeamSchema)),
    removeDivisionSuperform: await superValidate(zod(removeDivisionSchema)),
    changeDivisionSuperform: await superValidate(zod(changeDivisionSchema)),
  };
};

