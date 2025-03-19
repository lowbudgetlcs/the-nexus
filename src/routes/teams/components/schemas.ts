import { z } from 'zod';
import { teamName, divisionName, multi } from '$lib/validation';

export const changeDivisionSchema = z.object({
  divisionName: divisionName,
});
export const createTeamSchema = z.object({
  name: teamName,
  divisionName: divisionName.nullable(),
  logo: z.string().url().nullable(),
  multi: multi.nullable(),
});
export const removeDivisionSchema = z.object({
  teamName: teamName,
});

export type ChangeDivisionFormSchema = typeof changeDivisionSchema;
export type CreateTeamFormSchema = typeof createTeamSchema;
export type RemoveDivisionFormSchema = typeof removeDivisionSchema;
