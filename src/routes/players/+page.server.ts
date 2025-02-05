import type { PageServerLoad } from './$types';
import type { Player } from './columns';
export const load: PageServerLoad = async () => {
  const players: Player[] = [
    {
      name: 'ruuffian#FUNZ',
      team: 'Naughty Bois',
      active: true
    },
    {
      name: 'Xellius#N B',
      team: 'Naughty Bois',
      active: true
    },
    {
      name: 'Zebra#N B',
      team: 'Naughty Bois',
      active: true
    },
    {
      name: 'Unkindness#N B',
      team: 'Naughty Bois',
      active: true
    },
    {
      name: 'Seir#qiiqo',
      team: 'Naughty Bois',
      active: true
    }
  ];
  return {
    players
  };
};
