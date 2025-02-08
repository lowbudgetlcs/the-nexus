import { lblcsDb } from '$lib/server/db/lblcs';
import { divisions, players, teams } from '$lib/server/db/lblcs/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import type { Player } from '$lib/types/entities';
import { zod } from 'sveltekit-superforms/adapters';
import { createPlayerSchema } from './components/schema';
import { fail, setError, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async () => {
  const playerList: Player[] = await lblcsDb
    .select({ name: players.summonerName, team: teams.name, division: divisions.name })
    .from(players)
    .leftJoin(teams, eq(players.teamId, teams.id))
    .leftJoin(divisions, eq(teams.divisionId, divisions.id));

  return {
    players: playerList,
    form: await superValidate(zod(createPlayerSchema)),
  };
};

export const actions = {
  create: async (e) => {
    const form = await superValidate(e, zod(createPlayerSchema));
    if (!form.valid) return fail(400, { form });
    return setError(form, 'summonerName', 'You are bad at corki.');
  },
  add: async (e) => {},
  remove: async (e) => {},
} satisfies Actions;
