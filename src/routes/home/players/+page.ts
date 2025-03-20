import type { PageLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import {
  createPlayerSchema,
  changePlayerTeamSchema,
  removePlayerTeamSchema,
} from './components/schemas';
export const load: PageLoad = async ({ data }) => {
  const players = data.players;
  return {
    players: players,
    createPlayerSuperform: await superValidate(zod(createPlayerSchema)),
    changeTeamSuperform: await superValidate(zod(changePlayerTeamSchema)),
    removeTeamSuperform: await superValidate(zod(removePlayerTeamSchema)),
  };
};
