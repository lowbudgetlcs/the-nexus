import { z } from 'zod';

export const formSchema = z.object({
  summonerName: z.string().min(3).max(30).includes('#'),
  team: z.string().min(1).max(80).nullable(),
});

export type FormSchema = typeof formSchema;
