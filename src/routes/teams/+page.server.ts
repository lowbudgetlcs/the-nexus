import { fail, superValidate, setError } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from '../$types';
import { createTeamSchema } from './components/create-team/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { checkTeamExistence, fetchAllTeams, insertTeam } from '$lib/server/teams';
import { checkDivisionExistence } from '$lib/server/divisions';
import { insertPlayer } from '$lib/server/players';
import type { Team } from '$lib/types/entities';

export const load: PageServerLoad = async () => {
  const teamList: Team[] = [];
  const teamFetch = await fetchAllTeams();
  if (teamFetch.type === 'success') teamList.push(...teamFetch.data);
  return { teams: teamList, createTeamForm: await superValidate(zod(createTeamSchema)) };
};

export const actions = {
  create: async (e) => {
    const form = await superValidate(e, zod(createTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { name, divisionName, multi } = form.data;
    // Check that team doesnt exist
    const teamCheck = await checkTeamExistence(name);
    if (teamCheck.type === 'error') return setError(form, 'name', teamCheck.reason);
    if (teamCheck.data) return setError(form, 'name', `Team '${name}' already exists.`);
    // Check that division exists
    const divisionCheck = await checkDivisionExistence(divisionName);
    if (divisionCheck.type === 'error') return setError(form, 'divisionName', divisionCheck.reason);
    if (!divisionCheck.data)
      return setError(form, 'divisionName', `Division '${divisionName}' doesn't exist.`);
    // Parse multi link
    const summoners = [];
    if (multi) {
      const [_, queryString] = multi.split('?');
      const params = new URLSearchParams(queryString);
      const summonersParam = params.get('summoners');
      if (summonersParam) {
        summoners.push(...summonersParam.split(','));
      }
    }
    // Create team
    const insertTeamRes = await insertTeam(name, divisionName);
    if (insertTeamRes.type === 'error') return setError(form, 'name', insertTeamRes.reason);
    // Insert players
    const insertPromises = summoners.map((p) => insertPlayer(p, name));
    const insertErrors = (await Promise.all(insertPromises))
      .filter((res) => res.type === 'error')
      .map((res) => res.reason);
    if (insertErrors.length > 0) return setError(form, 'multi', insertErrors);
  },
} satisfies Actions;
