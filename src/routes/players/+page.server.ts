import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import {
  createPlayerSchema,
  removePlayerTeamSchema,
  changePlayerTeamSchema,
} from './components/schemas';
import { readAllPlayers, createPlayer, updatePlayerTeam } from '$lib/server/players';
import { checkTeamExists } from '$lib/server/teams';
import { Success } from '$lib/utils';

export const load: PageServerLoad = async () => {
  const players = await readAllPlayers();
  if (Success(players)) return { players: players.unwrap() };
  else return { players: [] };
};

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const form = await superValidate(data, zod(createPlayerSchema));
    if (!form.valid) return fail(400, { form });
    const { summonerName, team } = form.data;
    // Check if team exists
    if (team) {
      const teamCheck = await checkTeamExists(team);
      if (!Success(teamCheck)) return setError(form, 'team', teamCheck.err);
      if (!teamCheck.unwrap()) return setError(form, 'team', `Team '${team}' does not exist.`);
    }
    const res = await createPlayer(summonerName, team);
    if (!Success(res)) return setError(form, 'summonerName', res.err);
    return message(form, res.unwrap());
  },
  changeTeam: async ({ request }) => {
    const data = await request.formData();
    const form = await superValidate(data, zod(changePlayerTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { team } = form.data;
    // Check if team exists
    const teamExists = await checkTeamExists(team);
    if (!Success(teamExists)) return setError(form, 'team', teamExists.err);
    if (!teamExists.unwrap()) return setError(form, 'team', `Team '${team}' does not exist.`);
    if (!data.has('summonerName')) return setError(form, 'team', 'An unknown error occured.');
    else {
      const summonerName = data.get('summonerName') as string;
      const res = await updatePlayerTeam(summonerName, team);
      if (!Success(res)) return setError(form, 'team', res.err);
      return message(form, res.unwrap());
    }
  },
  removeTeam: async ({ request }) => {
    const data = await request.formData();
    const form = await superValidate(data, zod(removePlayerTeamSchema));
    if (!form.valid) return fail(400, { form });
    if (!data.has('summonerName')) return setError(form, '', 'An unknown error occured.');
    else {
      const summonerName = data.get('summonerName') as string;
      const res = await updatePlayerTeam(summonerName, null);
      if (!Success(res)) return setError(form, '', res.err);
      return message(form, res.unwrap());
    }
  },
} satisfies Actions;
