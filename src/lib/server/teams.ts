import type { Team } from '$lib/types/models';
import type { AsyncResult } from '$lib/types/result';
import { Ok, Err } from '$lib/types/result';
import { lblcsDb } from '$lib/server/db/lblcs';
import { count, eq, sql } from 'drizzle-orm';
import { teams, divisions, players } from '$lib/server/db/lblcs/schema';
import { unexpectedError } from '$lib/utils';

export async function readAllTeams(): AsyncResult<Team[], string> {
  try {
    const res = await lblcsDb
      .select({ name: teams.name, division: divisions.name, playerCount: count(players.id) })
      .from(teams)
      .leftJoin(players, eq(players.teamId, teams.id))
      .leftJoin(divisions, eq(teams.divisionId, divisions.id))
      .groupBy(teams.name, divisions.name);
    return Ok(res);
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
export async function checkTeamExists(team: string): AsyncResult<boolean, string> {
  try {
    const res: { count: number }[] = await lblcsDb
      .select({ count: count() })
      .from(teams)
      .where(sql`lower(${teams.name}) = lower(${team})`)
    if (res[0].count > 0) return Ok(true);
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
