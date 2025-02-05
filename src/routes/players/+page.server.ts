import type { PageServerLoad } from './$types';
import type { Player } from './columns';
export const load: PageServerLoad = async () => {
  
  const players: Player[] = [];

  return {
    players,
  };
};
