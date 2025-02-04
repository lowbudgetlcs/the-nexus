import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (e) => {
	const user = e.locals.user;

	if (!user && e.route.id != '/login') {
		throw redirect(302, '/login');
	}

	return {
		user
	};
};
