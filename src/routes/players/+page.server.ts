import type { PageServerLoad } from './$types';
import type { Player } from './columns';
export const load: PageServerLoad = async () => {
  const players: Player[] = [
    {
      name: 'ruuffian#FUNZ',
      team: 'zzNaughty Bois',
    },
    {
      name: 'Xellius#N B',
      team: 'zzNaughty Bois',
    },
    {
      name: 'Zebra#N B',
      team: 'zzNaughty Bois',
    },
    {
      name: 'Unkindness#N B',
      team: null,
    },
    {
      name: 'Seir#qiiqo',
      team: 'Naughty Bois',
    },
    {
      name: 'ruuffian#FUNZ',
      team: 'Naughty Bois',
    },
    {
      name: 'Xellius#N B',
      team: 'Naughty Bois',
    },
    {
      name: 'Zebra#N B',
      team: 'aaNaughty Bois',
    },
    {
      name: 'Unkindness#N B',
      team: 'Naughty Bois',
    },
    {
      name: 'Seir#qiiqo',
      team: 'aaNaughty Bois',
    },
    {
      name: 'ruuffian#FUNZ',
      team: 'Naughty Bois',
    },
    {
      name: 'Xellius#N B',
      team: 'Naughty Bois',
    },
    {
      name: 'Zebra#N B',
      team: 'Naughty Bois',
    },
    {
      name: 'Unkindness#N B',
      team: 'Naughty Bois',
    },
    {
      name: 'Seir#qiiqo',
      team: 'Naughty Bois',
    },
  ];
  return {
    players,
  };
};
