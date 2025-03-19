
import { z } from 'zod';
import { summonerName, teamName } from '$lib/validation';

export const removePlayerTeamSchema = z.object({
  summonerName: summonerName,
});
export type RemovePlayerTeamFormSchema = typeof removePlayerTeamSchema;

export const createPlayerSchema = z.object({
  summonerName: summonerName,
  team: teamName.nullable(),
});
export type CreatePlayerFormSchema = typeof createPlayerSchema;

export const changePlayerTeamSchema = z.object({
  summonerName: summonerName,
  team: teamName,
});
export type ChangePlayerTeamFormSchema = typeof changePlayerTeamSchema;
