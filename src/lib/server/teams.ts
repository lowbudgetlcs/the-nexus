import type { Team } from '$lib/types/entities';
import type { Result } from '$lib/types/result';
import { lblcsDb } from '$lib/server/db/lblcs';
import { count, eq, sql } from 'drizzle-orm';
import { teams, divisions, players } from '$lib/server/db/lblcs/schema';

export async function fetchAllTeams(): Promise<Result<Team[]>> {
  try {
    const fetchRes = await lblcsDb
      .select({ name: teams.name, division: divisions.name, playerCount: count(players.id) })
      .from(teams)
      .leftJoin(players, eq(players.teamId, teams.id))
      .leftJoin(divisions, eq(teams.divisionId, divisions.id))
      .groupBy(teams.name, divisions.name);
    return { type: 'success', data: fetchRes };
  } catch (e) {
    console.log(e);
    return { type: 'error', reason: 'An unkown error occured while fetching all teams.' };
  }
}

/**
 *
 * @param team Case-insensitive team name.
 * @returns A result containing true if a team was found.
 */
export async function checkTeamExistence(team: string): Promise<Result<boolean>> {
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

/**
 * Inserts a team into the database with the given division. Does not check division existence
 * @param team
 * @param division
 */
export async function insertTeam(
  team: string,
  division: string | null,
  logo: string | null,
): Promise<Result<string>> {
  try {
    const divisionId = lblcsDb.$with('division_id').as(
      lblcsDb
        .select({ value: divisions.id })
        .from(divisions)
        .where(sql`lower(${divisions.name}) = lower(${division})`),
    );
    const insertRes = await lblcsDb
      .with(divisionId)
      .insert(teams)
      .values({ name: team, divisionId: sql`(SELECT * FROM ${divisionId})`, logo: logo })
      .returning();
    if (insertRes.length > 0)
      return { type: 'success', data: `Successfully inserted '${team}' into '${division}'!` };
    return { type: 'error', reason: `Failed to insert '${team}' into '${division}'.` };
  } catch (e) {
    console.log(e);
    return { type: 'error', reason: 'An unknown error occured while inserting a team.' };
  }
}
