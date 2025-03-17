import type { Result } from '$lib/types/result';
import { Ok, Err } from '$lib/types/result';
import { divisions, teams } from '$lib/server/db/lblcs/schema';
import { lblcsDb } from '$lib/server/db/lblcs';
import { count, eq, sql } from 'drizzle-orm';
import type { Division } from '$lib/types/models';

/**
 *
 * @param division A division name.
 * @returns A result containing true if a division is found.
 */
export async function checkDivisionExistence(division: string): Promise<Result<boolean, string>> {
  try {
    const resDivision: Division[] = await lblcsDb
      .select({ name: divisions.name, teamCount: count(teams.id) })
      .from(divisions)
      .leftJoin(teams, eq(teams.divisionId, divisions.id))
      .where(sql`lower(${divisions.name}) = lower(${division})`)
      .groupBy(divisions.name);
    if (resDivision.length > 0) return Ok(true);
    return Ok(false);
  } catch (e) {
    console.log(e);
    return Err('An unknown error occured while checking team existence.');
  }
}
