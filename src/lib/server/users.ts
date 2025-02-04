import argon2 from 'argon2';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import type { Result } from '$lib/types/result';

export async function loginUser(username: string, password: string): Promise<Result<string>> {
	const fetchedUser = await db.select().from(users).where(eq(users.username, username)).limit(1);

	if (fetchedUser.length < 1) {
		return {
			type: 'error',
			reason: 'User does not exist.'
		};
	}
	const user = fetchedUser[0];

	//const authenticated = await argon2.verify(user.password, password);
	const authenticated = password === user.password;
	if (!authenticated) {
		return {
			type: 'error',
			reason: 'Incorrect password.'
		};
	}

	const jwtUser = {
		id: user.id,
		username: user.username
	};

	const token = jwt.sign(jwtUser, env.JWT_SECRET_KEY!, {
		expiresIn: '1d'
	});

	return { type: 'success', data: token };
}
