import { lblcsDb } from '$lib/server/db/lblcs';
import { players, teams } from '$lib/server/db/lblcs/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import type { Player } from '$lib/types/entities';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import { changePlayerTeamSchema } from './components/change-team/schema';
import { removePlayerTeamSchema } from './components/remove-team/schema';
import { createPlayerSchema } from './components/create-player/schema';
import {
  checkPlayerExistence,
  checkRiotIdExists,
  fetchAllPlayers,
  insertPlayer,
} from '$lib/server/players';
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
    return message(form, `Successfully created '${summonerName}'!`);
  },
  changeTeam: async (e) => {
    const form = await superValidate(e, zod(changePlayerTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { summonerName, team } = form.data;
    const [gameName, tagLine] = summonerName.split('#');
    // Check if player exists
    const accountRes = await checkRiotIdExists(gameName, tagLine);
    if (accountRes.type === 'error') return setError(form, 'team', accountRes.reason);
    const account = accountRes.data;
    const playerCheck = await checkPlayerExistence(account.puuid);
    if (playerCheck.type === 'error') return setError(form, 'team', playerCheck.reason);
    if (!playerCheck.data) return setError(form, 'team', `Player '${summonerName}' doesn't exist.`);
    // Check if team exists
    const teamCheck = await checkTeamExistence(team);
    if (teamCheck.type === 'error') return setError(form, 'team', teamCheck.reason);
    if (!teamCheck.data) return setError(form, 'team', `Team '${team}' does not exist.`);
    // Set player's teamId to new team
    try {
      const teamId = lblcsDb.$with('team_id').as(
        lblcsDb
          .select({ value: teams.id })
          .from(teams)
          .where(sql`lower(${teams.name}) = lower(${team})`),
      );
      await lblcsDb
        .with(teamId)
        .update(players)
        .set({ teamId: sql`(SELECT * FROM ${teamId})` })
        .where(eq(players.riotPuuid, account.puuid));
      return message(form, `Successfully added '${summonerName}' to '${team}'!`);
    } catch (e) {
      console.log(e);
      return setError(form, 'team', 'An unexpected error occured.');
    }
  },
  removeTeam: async (e) => {
    // Check if player exists
    const form = await superValidate(e, zod(removePlayerTeamSchema));
    if (!form.valid) return fail(400, { form });
    const { summonerName } = form.data;
    const [gameName, tagLine] = summonerName.split('#');
    // Check if player exists
    const accountRes = await checkRiotIdExists(gameName, tagLine);
    if (accountRes.type === 'error') return setError(form, 'summonerName', accountRes.reason);
    const account = accountRes.data;
    const playerCheck = await checkPlayerExistence(account.puuid);
    if (playerCheck.type === 'error') return setError(form, 'summonerName', playerCheck.reason);
    if (!playerCheck.data)
      return setError(form, 'summonerName', `Player '${summonerName}' doesn't exist.`);
    // Set player's teamId to null
    try {
      await lblcsDb
        .update(players)
        .set({ teamId: null })
        .where(eq(players.riotPuuid, account.puuid));
      return message(form, `Successfully removed '${summonerName}'.`);
    } catch (e) {
      console.log(e);
      return setError(form, 'summonerName', 'An unexpected error occured.');
    }
  },
} satisfies Actions;
