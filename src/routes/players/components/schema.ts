import { z } from 'zod';

const summonerName = z.string().min(3).max(30).includes('#');
const teamName = z.string().min(1).max(80);

export const createPlayerSchema = z.object({
  summonerName: summonerName,
  team: teamName.nullable(),
});
export type CreatePlayerFormSchema = typeof createPlayerSchema;

export const addPlayerSchema = z.object({
  summonerName: summonerName,
  team: teamName,
});
export type AddPlayerFormSchema = typeof addPlayerSchema;
