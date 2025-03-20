import { zod } from 'sveltekit-superforms/adapters';
import type { PageLoad } from './$types';
import { loginSchema } from './schema';
import { superValidate } from 'sveltekit-superforms';

export const load: PageLoad = async () => {
  return {
    superform: await superValidate(zod(loginSchema)),
  };
};
