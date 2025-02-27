import { z } from 'zod';
import { teamName, divisionName, multi } from '$lib/validation';

const formSchema = z.object({
  name: teamName,
  divisionName: divisionName.nullable(),
  logo: z.string().url().nullable(),
  multi: multi.nullable(),
});
export const createTeamSchema = formSchema;
export type CreateTeamFormSchema = typeof formSchema;
