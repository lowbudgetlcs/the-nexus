import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import pino from 'pino';
const logger = pino();

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (user) {
    redirect(302, '/home');
  }
};

export const actions = {
  logout: async ({ locals, cookies }) => {
    logger.info(`'${locals.user.username}' logged out!`);
    cookies.delete('AuthorizationToken', {
      path: '/',
    });

    redirect(302, '/login');
  },
} satisfies Actions;
