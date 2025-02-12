import { z } from 'zod';
import { teamName } from '$lib/validation';

const formSchema = z.object({
  teamName: teamName,
});
export const removeDivisionSchema = formSchema;
export type RemoveDivisionFormSchema = typeof formSchema;
