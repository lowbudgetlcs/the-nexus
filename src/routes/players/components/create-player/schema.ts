import { z } from 'zod';
import { summonerName, teamName } from '$lib/validation';

const formSchema = z.object({
  summonerName: summonerName,
  team: teamName.nullable(),
});
export const createPlayerSchema = formSchema;
export type CreatePlayerFormSchema = typeof formSchema;
