import { env } from '$env/dynamic/private'
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export const handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('AuthorizationToken');

	if (authCookie) {
		// Remove Bearer prefix
		const token = authCookie.split(' ')[1];

		try {
			const jwtUser = jwt.verify(token, env.JWT_SECRET_KEY!);
			if (typeof jwtUser === 'string') {
				throw new Error('Something went wrong');
			}

			const res = await db.select().from(users).where(eq(users.id, jwtUser.id));

			if (res.length == 0) {
				throw new Error('User not found');
			}
			const user = res[0];

			const sessionUser = {
				id: user.id,
				username: user.username
			};

			event.locals.user = sessionUser;
		} catch (error) {
			console.error(error);
		}
	}

	return await resolve(event);
};
