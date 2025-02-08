import { z } from 'zod';

export const createPlayerSchema = z.object({
  summonerName: z.string().min(3).max(30).includes('#'),
  team: z.string().min(1).max(80).nullable(),
});
export type CreatePlayerFormSchema = typeof createPlayerSchema;

export const addPlayerSchema = z.object({
  team: z.string().min(1).max(80),
});
export type AddPlayerFormSchema = typeof addPlayerSchema;
