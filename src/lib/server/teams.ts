import type { Team } from '$lib/types/models';
import type { AsyncResult } from '$lib/types/result';
import { Ok, Err, Success } from '$lib/types/result';
import { lblcsDb } from '$lib/server/db/lblcs';
import { count, eq, sql } from 'drizzle-orm';
import { teams, divisions, players } from '$lib/server/db/lblcs/schema';
import { unexpectedError } from '$lib/utils';

export async function fetchAllTeams(): AsyncResult<Team[], string> {
  try {
    const fetchRes = await lblcsDb
      .select({ name: teams.name, division: divisions.name, playerCount: count(players.id) })
      .from(teams)
      .leftJoin(players, eq(players.teamId, teams.id))
      .leftJoin(divisions, eq(teams.divisionId, divisions.id))
      .groupBy(teams.name, divisions.name);
    return Ok(fetchRes);
  } catch (e) {
    console.log(e);
    return Err(unexpectedError);
  }
}

/**
 *
 * @param team Case-insensitive team name.
 * @returns A result containing true if a team was found.
 */
export async function checkTeamExistence(team: string): AsyncResult<boolean, string> {
  try {
    const resTeam: Team[] = await lblcsDb
      .select({ name: teams.name, division: divisions.name, playerCount: count(players.id) })
      .from(teams)
      .leftJoin(divisions, eq(teams.divisionId, divisions.id))
      .leftJoin(players, eq(players.teamId, teams.id))
      .where(sql`lower(${teams.name}) = lower(${team})`)
      .groupBy(teams.name, divisions.name);
    if (resTeam.length > 0) return Ok(true);
    return Ok(false);
  } catch (e) {
    console.log(e);
    return Err(unexpectedError);
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
): AsyncResult<string, string> {
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
    if (insertRes.length > 0) return Ok(`Successfully inserted '${team}' into '${division}'!`);
    return Err(`Failed to insert '${team}' into '${division}'.`);
  } catch (e) {
    console.log(e);
    return Err(unexpectedError);
  }
}
