import { z } from 'zod';
import { summonerName } from '$lib/validation';

const formSchema = z.object({
  summonerName: summonerName,
});
export const removePlayerTeamSchema = formSchema;
export type RemovePlayerTeamFormSchema = typeof formSchema;
