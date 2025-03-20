import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (user) {
    redirect(302, '/home');
  }
};

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete('AuthorizationToken', {
      path: '/',
    });

    redirect(302, '/login');
  },
} satisfies Actions;
