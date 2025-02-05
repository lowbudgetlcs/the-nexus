import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, route }) => {
  const user = locals.user;

  if (!user && route.id != '/login') {
    throw redirect(302, '/login');
  }
  return { render: !!user };
};
