import type { PageLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { createPlayerSchema, changePlayerTeamSchema, removePlayerTeamSchema } from './components/schemas';
export const load: PageLoad = async ({ data }) => {
  const players = data.players;
  const promisesChangePlayerTeam = players.map((_, id) => {
    return superValidate(zod(changePlayerTeamSchema), { id: `${id}` });
  });
  const promisesRemoveTeam = players.map((_, id) => {
    return superValidate(zod(removePlayerTeamSchema), { id: `${id}` });
  });
  return {
    players: players,
    createPlayerForm: await superValidate(zod(createPlayerSchema)),
    changePlayerTeamForms: await Promise.all(promisesChangePlayerTeam),
    removePlayerForms: await Promise.all(promisesRemoveTeam),
  }

}
