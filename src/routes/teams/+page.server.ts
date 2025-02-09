import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from '../$types';
import { createTeamSchema } from './components/create-team/schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Team } from '$lib/types/entities';

export const load: PageServerLoad = async () => {
  const teamList: Team[] = [{ name: "Ruuffian's Team", division: 'TEST_DIV', playerCount: 0 }];
  try {
    teamList.push(...[]);
  } catch (e) {
    console.log(e);
  }
  return { teams: teamList, createTeamForm: await superValidate(zod(createTeamSchema)) };
};

export const actions = {
  create: async (e) => {
    console.log('Not implemented.');
  },
} satisfies Actions;
