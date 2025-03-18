import type { PageServerLoad, Actions } from './$types';
import type { Player } from '$lib/types/models';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import { changePlayerTeamSchema } from './components/change-team/schema';
import { removePlayerTeamSchema } from './components/remove-team/schema';
import { createPlayerSchema } from './components/create-player/schema';
import { readAllPlayers, createPlayer, updatePlayerTeam } from '$lib/server/players';
import { checkTeamExists } from '$lib/server/teams';
import { Success, sanitize } from '$lib/utils';

export const load: PageServerLoad = async () => {
  const playerList: Player[] = [];
  const players = await readAllPlayers();
  if (Success(players)) playerList.push(...players.unwrap());

  // This can be done with streaming I'm 99% sure. Should look into it.
  const promisesChangePlayerTeam = playerList.map((_, id) => {
    return superValidate(zod(changePlayerTeamSchema), { id: `${id}` });
  });
  const promisesRemoveTeam = playerList.map((_, id) => {
    return superValidate(zod(removePlayerTeamSchema), { id: `${id}` });
  });

  return {
    players: playerList,
    createPlayerForm: await superValidate(zod(createPlayerSchema)),
    changePlayerTeamForms: await Promise.all(promisesChangePlayerTeam),
    removePlayerForms: await Promise.all(promisesRemoveTeam),
  };
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
