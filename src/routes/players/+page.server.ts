import type { PageServerLoad, Actions } from './$types';
import type { Player } from '$lib/types/entities';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import { changePlayerTeamSchema } from './components/change-team/schema';
import { removePlayerTeamSchema } from './components/remove-team/schema';
import { createPlayerSchema } from './components/create-player/schema';
import { fetchAllPlayers, insertPlayer, updatePlayerTeam } from '$lib/server/players';
import { checkTeamExistence } from '$lib/server/teams';

export const load: PageServerLoad = async () => {
  const playerList: Player[] = [];
  const playerFetch = await fetchAllPlayers();
  if (playerFetch.type === 'success') playerList.push(...playerFetch.data);

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
    const { summonerName, team } = form.data;
    // Check if team exists
    if (team) {
      const teamCheck = await checkTeamExistence(team);
      if (teamCheck.type === 'error') return setError(form, 'team', teamCheck.reason);
      if (!teamCheck.data) return setError(form, 'team', `Team '${team}' does not exist.`);
    }
    const insertRes = await insertPlayer(summonerName, team);
    if (insertRes.type === 'error') return setError(form, 'summonerName', insertRes.reason);
    return message(form, insertRes.data);
  },
  changeTeam: async (e) => {
    const form = await superValidate(e, zod(changePlayerTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { summonerName, team } = form.data;
    // Check if team exists
    const teamCheck = await checkTeamExistence(team);
    if (teamCheck.type === 'error') return setError(form, 'team', teamCheck.reason);
    if (!teamCheck.data) return setError(form, 'team', `Team '${team}' does not exist.`);
    const updateRes = await updatePlayerTeam(summonerName, team);
    if (updateRes.type === 'error') return setError(form, 'summonerName', updateRes.reason);
    return message(form, updateRes.data);
  },
  removeTeam: async (e) => {
    const form = await superValidate(e, zod(removePlayerTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { summonerName } = form.data;
    const updateRes = await updatePlayerTeam(summonerName, null);
    if (updateRes.type === 'error') return setError(form, 'summonerName', updateRes.reason);
    return message(form, updateRes.data);
  },
} satisfies Actions;
