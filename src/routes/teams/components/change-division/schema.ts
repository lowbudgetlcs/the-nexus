import { z } from 'zod';
import { teamName, divisionName } from '$lib/validation';

const formSchema = z.object({
  teamName: teamName,
  divisionName: divisionName,
});
export const changeDivisionSchema = formSchema;
export type ChangeDivisionFormSchema = typeof formSchema;
