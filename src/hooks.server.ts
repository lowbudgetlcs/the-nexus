import { authenticate } from '$lib/server/auth';
import { type Handle, redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Get authentication cookie
  const authCookie = event.cookies.get('AuthorizationToken');

  if (authCookie) {
    // Remove Bearer prefix
    const token = authCookie.split(' ')[1];
    event.locals.user = await authenticate(token);
  }
  if (!event.url.pathname.startsWith('/login')) {
    if (!event.locals.user) 
      redirect(302, '/login');
  }

  const response = await resolve(event);
  return response;
};
