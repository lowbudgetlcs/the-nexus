import { loginUser } from '$lib/server/users';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (user) {
    throw redirect(302, '/');
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
    if (res.type === 'error') return setError(form, 'password', 'Failed to authenticate.');

    e.cookies.set('AuthorizationToken', `Bearer ${res.data}`, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });
    throw redirect(302, '/');
  },
} satisfies Actions;
