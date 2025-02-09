import { lblcsDb } from '$lib/server/db/lblcs';
import { divisions, players, teams } from '$lib/server/db/lblcs/schema';
import { count, eq, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import type { Player, Team } from '$lib/types/entities';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import { fetchAccountByRiotId } from '$lib/server/riot';
import type { RiotAPITypes } from '@fightmegg/riot-api';
import type { Result } from '$lib/types/result';
import { changePlayerTeamSchema } from './components/change-team/schema';
import { removePlayerTeamSchema } from './components/remove-team/schema';
import { createPlayerSchema } from './components/create-player/schema';

export const load: PageServerLoad = async () => {
  const playerList: Player[] = [];
  try {
    playerList.push(
      ...(await lblcsDb
        .select({ name: players.summonerName, team: teams.name, division: divisions.name })
        .from(players)
        .leftJoin(teams, eq(players.teamId, teams.id))
        .leftJoin(divisions, eq(teams.divisionId, divisions.id))),
    );
  } catch (e) {
    console.log(e);
  }

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
    const [gameName, tagLine] = form.data.summonerName.split('#');
    // Check that riot account exists
    const account = await checkRiotIdExists(gameName, tagLine);
    if (account.type === 'error') return setError(form, 'summonerName', account.reason);
    // Check player doesn't already exist
    const playerCheck = await checkPlayerExistence(account.data.puuid);
    if (playerCheck.type === 'error') return setError(form, 'summonerName', playerCheck.reason);
    if (playerCheck.data)
      return setError(form, 'summonerName', `Riot ID '${summonerName}' already exists.`);
    // Check if team exists
    if (team) {
      const teamCheck = await checkTeamExistence(team);
      if (teamCheck.type === 'error') return setError(form, 'team', teamCheck.reason);
      if (!teamCheck.data) return setError(form, 'team', `Team '${team}' does not exist.`);
    }
    try {
      // Insert player with teamId (possibly null)
      const teamId = lblcsDb.$with('team_id').as(
        lblcsDb
          .select({ value: teams.id })
          .from(teams)
          .where(sql`lower(${teams.name}) = lower(${team})`),
      );
      await lblcsDb
        .with(teamId)
        .insert(players)
        .values({
          summonerName: summonerName,
          riotPuuid: account.data.puuid,
          teamId: sql`(SELECT * FROM ${teamId})`,
        });
      return message(form, `'${summonerName}' successfully created!`);
    } catch (e) {
      console.log(e);
      return setError(form, 'summonerName', 'An unexpected error occured.');
    }
  },
  add: async (e) => {
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
  remove: async (e) => {
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
    // Set player's teamId to null
  },
} satisfies Actions;

async function checkRiotIdExists(
  gameName: string,
  tagLine: string,
): Promise<Result<RiotAPITypes.Account.AccountDTO>> {
  const res = await fetchAccountByRiotId(gameName, tagLine);
  if (res.type === 'error') return { type: 'error', reason: res.reason };
  return { type: 'success', data: res.data };
}

async function checkPlayerExistence(puuid: string): Promise<Result<boolean>> {
  try {
    const resPlayer = await lblcsDb.select().from(players).where(eq(players.riotPuuid, puuid));
    if (resPlayer.length > 0) return { type: 'success', data: true };
    return { type: 'success', data: false };
  } catch (e) {
    console.log(e);
    return { type: 'error', reason: 'Unknown error occured while checking player existence.' };
  }
}

async function checkTeamExistence(team: string): Promise<Result<boolean>> {
  try {
    const resTeam: Team[] = await lblcsDb
      .select({ name: teams.name, division: divisions.name, playerCount: count(players.id) })
      .from(teams)
      .leftJoin(divisions, eq(teams.divisionId, divisions.id))
      .leftJoin(players, eq(players.teamId, teams.id))
      .where(sql`lower(${teams.name}) = lower(${team})`)
      .groupBy(teams.name, divisions.name);
    if (resTeam.length > 0) return { type: 'success', data: true };
    return { type: 'success', data: false };
  } catch (e) {
    console.log(e);
    return { type: 'error', reason: 'An unknown error occured while checking team existence.' };
  }
}
