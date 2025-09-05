import { redirect, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import pino from 'pino';
const logger = pino();

import { Success } from '$lib/result';
import { login } from '$lib/server/auth';
import { loginSchema } from './schema';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (user) {
    redirect(302, '/home');
  }
  return { form: await superValidate(zod(loginSchema)) };
};

export const actions = {
  login: async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid)
      return fail(400, { form });

    const res = await login(form.data.username, form.data.password);
    if (!Success(res))
      return setError(form, 'password', res.err);

    event.cookies.set('AuthorizationToken', `Bearer ${res.unwrap()}`, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });
    logger.info(`'${form.data.username}' successfully logged in!`);
    redirect(302, '/home');
  },
} satisfies Actions;

