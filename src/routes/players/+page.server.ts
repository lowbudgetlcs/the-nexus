import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import { createPlayerSchema, removePlayerTeamSchema, changePlayerTeamSchema } from './components/schemas';
import { readAllPlayers, createPlayer, updatePlayerTeam } from '$lib/server/players';
import { checkTeamExists } from '$lib/server/teams';
import { Success, sanitize } from '$lib/utils';

export const load: PageServerLoad = async () => {
  const players = await readAllPlayers();
  if (Success(players)) return { players: players.unwrap() };
  else return { players: [] };
};

export const actions = {
  create: async (e) => {
    const form = await superValidate(e, zod(createPlayerSchema));
    if (!form.valid) return fail(400, { form });
    const { summonerName: unsanitizedSummoner, team: unsanitizedTeam } = form.data;
    const [summonerName, team] = [sanitize(unsanitizedSummoner), sanitize(unsanitizedTeam)];
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
  changeTeam: async (e) => {
    const form = await superValidate(e, zod(changePlayerTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { summonerName: unsanitizedSummoner, team: unsanitizedTeam } = form.data;
    const [summonerName, team] = [sanitize(unsanitizedSummoner), sanitize(unsanitizedTeam)];
    // Check if team exists
    const teamExists = await checkTeamExists(team);
    if (!Success(teamExists)) return setError(form, 'team', teamExists.err);
    if (!teamExists.unwrap()) return setError(form, 'team', `Team '${team}' does not exist.`);
    const res = await updatePlayerTeam(summonerName, team);
    if (!Success(res)) return setError(form, 'summonerName', res.err);
    return message(form, res.unwrap());
  },
  removeTeam: async (e) => {
    const form = await superValidate(e, zod(removePlayerTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { summonerName: unsanitizedSummoner } = form.data;
    const [summonerName] = [sanitize(unsanitizedSummoner)];
    const res = await updatePlayerTeam(summonerName, null);
    if (!Success(res)) return setError(form, 'summonerName', res.err);
    return message(form, res.unwrap());
  },
} satisfies Actions;
