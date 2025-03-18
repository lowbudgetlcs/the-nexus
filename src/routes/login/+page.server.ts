import { loginUser } from '$lib/server/users';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { Success } from '$lib/types/result';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (user) {
    redirect(302, '/');
  }

  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
  login: async (e) => {
    const form = await superValidate(e, zod(formSchema));
    if (!form.valid) fail(400, { form });

    const res = await loginUser(form.data.username, form.data.password);
    if (!Success(res)) return setError(form, 'password', res.err);

    e.cookies.set('AuthorizationToken', `Bearer ${res.unwrap()}`, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, // 2 day
    });
    redirect(302, '/');
  },
} satisfies Actions;
