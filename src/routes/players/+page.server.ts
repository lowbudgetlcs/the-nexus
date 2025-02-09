import { lblcsDb } from '$lib/server/db/lblcs';
import { divisions, players, teams } from '$lib/server/db/lblcs/schema';
import { count, eq, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import type { Player, Team } from '$lib/types/entities';
import { zod } from 'sveltekit-superforms/adapters';
import { addPlayerSchema, createPlayerSchema } from './components/schema';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import { fetchAccountByRiotId } from '$lib/server/riot';
import { check } from 'drizzle-orm/mysql-core';
import type { RiotAPITypes } from '@fightmegg/riot-api';
import type { Result } from '$lib/types/result';

export const load: PageServerLoad = async () => {
  const playerList: Player[] = await lblcsDb
    .select({ name: players.summonerName, team: teams.name, division: divisions.name })
    .from(players)
    .leftJoin(teams, eq(players.teamId, teams.id))
    .leftJoin(divisions, eq(teams.divisionId, divisions.id));

  return {
    players: playerList,
    createPlayerForm: await superValidate(zod(createPlayerSchema)),
    addPlayerForm: await superValidate(zod(addPlayerSchema)),
  };
};

export const actions = {
  create: async (e) => {
    const form = await superValidate(e, zod(createPlayerSchema));
    if (!form.valid) return fail(400, { form });

    const { summonerName, team } = form.data;
    const gameName = summonerName.split('#')[0];
    const tagLine = summonerName.split('#')[1];
    try {
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
          summonerName: `${gameName}#${tagLine}`,
          riotPuuid: account.data.puuid,
          teamId: sql`(SELECT * FROM ${teamId})`,
        });
      return message(form, `'${gameName}#${tagLine}' successfully created!`);
    } catch (e) {
      console.log(e);
      return setError(form, 'summonerName', 'An unexpected error occured.');
    }
  },
  add: async (e) => {
    const form = await superValidate(e, zod(addPlayerSchema));
    if (!form.valid) return fail(400, { form });
    // Check if player exists
    // Check if team exists
    // Set player's teamId to new team
  },
  remove: async (e) => {
    console.log('Not implemented yet.');
    // Check if player exists
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
