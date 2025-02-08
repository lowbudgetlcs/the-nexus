import { lblcsDb } from '$lib/server/db/lblcs';
import { divisions, players, teams } from '$lib/server/db/lblcs/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import type { Player } from '$lib/types/entities';
import { zod } from 'sveltekit-superforms/adapters';
import { addPlayerSchema, createPlayerSchema } from './components/schema';
import { fail, superValidate } from 'sveltekit-superforms';

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
    // Check if valid riot id
    // Check if team exists
    // Add to players table with correct team id and puuid
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
