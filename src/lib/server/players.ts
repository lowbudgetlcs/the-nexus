import type { Result } from '$lib/types/result';
import { Ok, Err, Success } from '$lib/types/result';
import type { RiotAPITypes } from '@fightmegg/riot-api';
type AccountDto = RiotAPITypes.Account.AccountDTO;
import { fetchAccountByRiotId } from '$lib/server/riot';
import { lblcsDb } from '$lib/server/db/lblcs';
import { divisions, players, teams } from '$lib/server/db/lblcs/schema';
import { eq, sql } from 'drizzle-orm';
import type { Player } from '$lib/types/models';

export async function fetchAllPlayers(): Promise<Result<Player[], string>> {
  try {
    const fetchRes = await lblcsDb
      .select({ name: players.summonerName, team: teams.name, division: divisions.name })
      .from(players)
      .leftJoin(teams, eq(players.teamId, teams.id))
      .leftJoin(divisions, eq(teams.divisionId, divisions.id));
    return Ok(fetchRes);
  } catch (e) {
    console.log(e);
    return Err('An unexpected error occured.');
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
): Promise<Result<AccountDto, string>> {
  const res = await fetchAccountByRiotId(gameName, tagLine);
  return res;
}

/**
 *
 * @param puuid A unique riot identifier.
 * @returns A result containing true if a player is found.
 */
export async function checkPlayerExistence(puuid: string): Promise<Result<boolean, string>> {
  try {
    const resPlayer = await lblcsDb.select().from(players).where(eq(players.riotPuuid, puuid));
    if (resPlayer.length > 0) return Ok(true);
    return Ok(false);
  } catch (e) {
    console.log(e);
    return Err('An unexpected error occured.');
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
): Promise<Result<string, string>> {
  const [gameName, tagLine] = summonerName.split('#');
  // Check that riot account exists
  const account = await checkRiotIdExists(gameName, tagLine);
  if (!Success(account)) return account;
  // Check player doesn't already exist
  const playerCheck = await checkPlayerExistence(account.unwrap().puuid);
  if (!Success(playerCheck)) return playerCheck;
  if (playerCheck.unwrap()) return Err(`Riot ID '${summonerName}' already exists.`);
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
        riotPuuid: account.unwrap().puuid,
        teamId: sql`(SELECT * FROM ${teamId})`,
      })
      .returning();
    if (insertRes.length > 0) return Ok(`Successfully inserted '${summonerName}'!`);
    return Err(`Failed to insert '${summonerName}'.`);
  } catch (e) {
    console.log(e);
    return Err('An unexpected error occured.');
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
): Promise<Result<string, string>> {
  const [gameName, tagLine] = summonerName.split('#');
  // Check if player exists
  const accountRes = await checkRiotIdExists(gameName, tagLine);
  if (!Success(accountRes)) return accountRes;
  const account = accountRes.unwrap();
  const playerCheck = await checkPlayerExistence(account.puuid);
  if (!Success(playerCheck)) return playerCheck;
  if (!playerCheck.unwrap()) return Err(`Player '${summonerName}' doesn't exist.`);
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
    const data = team
      ? `Successfully added '${summonerName}' to '${team}'!`
      : `Successfully removed '${summonerName}'!`;
    return Ok(data);
  } catch (e) {
    console.log(e);
    return Err('An unexpected error occured.');
  }
}
