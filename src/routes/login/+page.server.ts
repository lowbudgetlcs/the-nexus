import { login } from '$lib/server/auth';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { Success } from '$lib/utils';
import { loginSchema } from './schema';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (user) {
    redirect(302, '/home');
  }
};

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const form = await superValidate(data, zod(loginSchema));
    if (!form.valid) fail(400, { form });

    const res = await login(form.data.username, form.data.password);
    if (!Success(res)) return setError(form, 'password', res.err);

    cookies.set('AuthorizationToken', `Bearer ${res.unwrap()}`, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });
    redirect(302, '/home');
  },
} satisfies Actions;
