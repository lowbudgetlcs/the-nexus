import { summonerName, teamName } from '$lib/validation';
import { z } from 'zod';

const formSchema = z.object({
  summonerName: summonerName,
  team: teamName,
});
export const changePlayerTeamSchema = formSchema;
export type ChangePlayerTeamFormSchema = typeof formSchema;
