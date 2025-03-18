import type { AsyncResult } from '$lib/utils';
import { Ok, Err, Success } from '$lib/utils';
import { lblcsDb } from '$lib/server/db/lblcs';
import { divisions, players, teams } from '$lib/server/db/lblcs/schema';
import { eq, sql } from 'drizzle-orm';
import type { Player } from '$lib/types/models';
import { fetchAccountByRiotId } from '$lib/server/riot';
import { unexpectedError } from '$lib/utils';

export async function readAllPlayers(): AsyncResult<Player[], string> {
  try {
    const res = await lblcsDb
      .select({ name: players.summonerName, team: teams.name, division: divisions.name, puuid: players.riotPuuid })
      .from(players)
      .leftJoin(teams, eq(players.teamId, teams.id))
      .leftJoin(divisions, eq(teams.divisionId, divisions.id));
    return Ok(res);
  } catch (e) {
    console.log(e);
    return Err(unexpectedError);
  }
}

/**
 *
 * @param puuid A unique riot identifier.
 * @returns A result containing true if a player is found in the database.
 */
export async function readPlayerByPuuid(puuid: string): AsyncResult<boolean, string> {
  try {
    const res = await lblcsDb.select().from(players).where(eq(players.riotPuuid, puuid));
    if (res.length > 0) return Ok(true);
    return Ok(false);
  } catch (e) {
    console.log(e);
    return Err(unexpectedError);
  }
}

/**
 *
 * @param gameName First half of a riotId
 * @param tagLine Second half of a riotId
 * @returns A result containing a player if found in the database.
 */
export async function readPlayerByRiotId(gameName: string, tagLine: string): AsyncResult<Player, string> {
  const riotId = `${gameName}#${tagLine}`;
  try {
    const res = await lblcsDb
      .select({ name: players.summonerName, team: teams.name, division: divisions.name, puuid: players.riotPuuid })
      .from(players)
      .leftJoin(teams, eq(players.teamId, teams.id))
      .leftJoin(divisions, eq(teams.divisionId, divisions.id))
      .where(sql`lower(${players.summonerName}) = lower(${riotId})`);
    if (res.length > 0) return Err(`Player '${riotId}' not found.`);
    return Ok(res[0]);
  } catch (e) {
    console.log(e);
    return Err(unexpectedError);
  }
}

/**
 * Inserts a player into the database with a given team. Team is set to null if it doesn't exist.
 * @param summonerName
 * @param team
 * @returns
 */
export async function createPlayer(
  summonerName: string,
  team: string | null,
): AsyncResult<string, string> {
  const [gameName, tagLine] = summonerName.split('#');
  // Check riot id exists
  const account = await fetchAccountByRiotId(gameName, tagLine);
  console.log(account)
  if (!Success(account)) return account;
  // Check player doesn't already exist
  const player = await readPlayerByPuuid(account.unwrap().puuid);
  console.log(player)
  if (!Success(player)) return player;
  if (player.unwrap()) return Err(`Player '${summonerName}' already exists`);
  try {
    // Insert player with teamId (possibly null)
    const teamId = lblcsDb.$with('team_id').as(
      lblcsDb
        .select({ value: teams.id })
        .from(teams)
        .where(sql`lower(${teams.name}) = lower(${team})`),
    );
    const res = await lblcsDb
      .with(teamId)
      .insert(players)
      .values({
        summonerName: summonerName,
        riotPuuid: account.unwrap().puuid,
        teamId: sql`(SELECT * FROM ${teamId})`,
      })
      .returning();
    if (res.length > 0) return Ok(`Successfully inserted '${summonerName}'!`);
    return Err(`Failed to insert '${summonerName}'.`);
  } catch (e) {
    console.log(e);
    return Err(unexpectedError);
  }
}

/**
 * Updates a player's team with an existing team. Does not validate team existence.
 * @param summonerName
 * @param team
 * @returns
 */
export async function updatePlayerTeam(
  summonerName: string,
  team: string | null,
): AsyncResult<string, string> {
  const [gameName, tagLine] = summonerName.split('#');
  // Check if player exists in database
  const player = await readPlayerByRiotId(gameName, tagLine);
  if (!Success(player)) return player;
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
      .where(eq(players.riotPuuid, player.unwrap().puuid));
    const data = team
      ? `Successfully added '${summonerName}' to '${team}'!`
      : `Successfully removed '${summonerName}'!`;
    return Ok(data);
  } catch (e) {
    console.log(e);
    return Err(unexpectedError);
  }
}
