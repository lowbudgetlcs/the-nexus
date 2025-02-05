import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login');
};

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete('AuthorizationToken', {
      path: '/'
    });

    throw redirect(302, '/login');
  }
} satisfies Actions;
