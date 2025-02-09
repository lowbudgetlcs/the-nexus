import { lblcsDb } from '$lib/server/db/lblcs';
import { divisions, players, teams } from '$lib/server/db/lblcs/schema';
import { count, eq, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import type { Player, Team } from '$lib/types/entities';
import { zod } from 'sveltekit-superforms/adapters';
import { addPlayerSchema, createPlayerSchema } from './components/schema';
import { fail, superValidate, setError, message } from 'sveltekit-superforms';
import { fetchAccountByRiotId } from '$lib/server/riot';

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
    try {
      // Check that riot account exists
      const gameName = summonerName.split('#')[0];
      const tagLine = summonerName.split('#')[1];
      const resAcc = await fetchAccountByRiotId(gameName, tagLine);
      if (resAcc.type === 'error') return setError(form, 'summonerName', resAcc.reason);
      const account = resAcc.data;
      // Check player doesn't already exist
      const resPlayer = await lblcsDb
        .select()
        .from(players)
        .where(eq(players.riotPuuid, account.puuid));
      if (resPlayer.length > 0)
        return setError(form, 'summonerName', `Player '${gameName}#${tagLine}' already exists.`);
      // Check if team exists
      if (team) {
        const resTeam: Team[] = await lblcsDb
          .select({ name: teams.name, division: divisions.name, playerCount: count(players.id) })
          .from(teams)
          .leftJoin(divisions, eq(teams.divisionId, divisions.id))
          .leftJoin(players, eq(players.teamId, teams.id))
          .where(sql`lower(${teams.name}) = lower(${team})`)
          .groupBy(teams.name, divisions.name);
        if (resTeam.length < 1) return setError(form, 'team', `Team '${team}' not found.`);
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
          riotPuuid: account.puuid,
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
