import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete('AuthorizationToken', {
      path: '/',
    });

    redirect(302, '/login');
  },
} satisfies Actions;
