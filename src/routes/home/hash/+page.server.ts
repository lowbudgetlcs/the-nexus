import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { hash } from '$lib/server/auth';
import { Success } from '$lib/utils';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './hashSchema';

export const load: PageServerLoad = async () => {
  return {
    superform: await superValidate(zod(formSchema)),
  };
};

export const actions = {
  hash: async (e) => {
    const form = await superValidate(e, zod(formSchema));
    if (!form.valid) fail(400, { form });

    const res = await hash(form.data.password);
    if (!Success(res)) return setError(form, 'password', res.err);
    return message(form, res.unwrap());
  },
} satisfies Actions;
