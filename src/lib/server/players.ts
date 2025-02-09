import type { Result } from '$lib/types/result';
import type { RiotAPITypes } from '@fightmegg/riot-api';
import { fetchAccountByRiotId } from '$lib/server/riot';
import { lblcsDb } from '$lib/server/db/lblcs';
import { divisions, players, teams } from '$lib/server/db/lblcs/schema';
import { eq, sql } from 'drizzle-orm';
import type { Player } from '$lib/types/entities';

export async function fetchAllPlayers(): Promise<Result<Player[]>> {
  try {
    const fetchRes = await lblcsDb
      .select({ name: players.summonerName, team: teams.name, division: divisions.name })
      .from(players)
      .leftJoin(teams, eq(players.teamId, teams.id))
      .leftJoin(divisions, eq(teams.divisionId, divisions.id));
    return { type: 'success', data: fetchRes };
  } catch (e) {
    console.log(e);
    return { type: 'error', reason: 'An unknown error occured while fetching all players.' };
  }
}

/**
 *
 * @param gameName First half of a riot ID.
 * @param tagLine Second half of a riot ID.
 * @returns A result containing the associated AccountDTO
 */
export async function checkRiotIdExists(
  gameName: string,
  tagLine: string,
): Promise<Result<RiotAPITypes.Account.AccountDTO>> {
  const res = await fetchAccountByRiotId(gameName, tagLine);
  if (res.type === 'error') return { type: 'error', reason: res.reason };
  return { type: 'success', data: res.data };
}

/**
 *
 * @param puuid A unique riot identifier.
 * @returns A result containing true if a player is found.
 */
export async function checkPlayerExistence(puuid: string): Promise<Result<boolean>> {
  try {
    const resPlayer = await lblcsDb.select().from(players).where(eq(players.riotPuuid, puuid));
    if (resPlayer.length > 0) return { type: 'success', data: true };
    return { type: 'success', data: false };
  } catch (e) {
    console.log(e);
    return { type: 'error', reason: 'Unknown error occured while checking player existence.' };
  }
}

/**
 * Inserts a player into the database with a given team. Does not validate team existence.
 * @param summonerName
 * @param team
 * @returns
 */
export async function insertPlayer(
  summonerName: string,
  team: string | null,
): Promise<Result<string>> {
  const [gameName, tagLine] = summonerName.split('#');
  // Check that riot account exists
  const account = await checkRiotIdExists(gameName, tagLine);
  if (account.type === 'error') return { type: 'error', reason: account.reason };
  // Check player doesn't already exist
  const playerCheck = await checkPlayerExistence(account.data.puuid);
  if (playerCheck.type === 'error') return { type: 'error', reason: playerCheck.reason };
  if (playerCheck.data)
    return { type: 'error', reason: `Riot ID '${summonerName}' already exists.` };
  try {
    // Insert player with teamId (possibly null)
    const teamId = lblcsDb.$with('team_id').as(
      lblcsDb
        .select({ value: teams.id })
        .from(teams)
        .where(sql`lower(${teams.name}) = lower(${team})`),
    );
    const insertRes = await lblcsDb
      .with(teamId)
      .insert(players)
      .values({
        summonerName: summonerName,
        riotPuuid: account.data.puuid,
        teamId: sql`(SELECT * FROM ${teamId})`,
      })
      .returning();
    if (insertRes.length > 0)
      return { type: 'success', data: `Successfully inserted '${summonerName}'!` };
    return { type: 'error', reason: `Failed to insert '${summonerName}'.` };
  } catch (e) {
    console.log(e);
    return { type: 'error', reason: 'An unexpected error occured.' };
  }
}
