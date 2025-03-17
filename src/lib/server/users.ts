import argon2 from 'argon2';
import { env } from '$env/dynamic/private';
import { usersDb } from '$lib/server/db/users';
import { users } from '$lib/server/db/users/schema';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import type { AsyncResult } from '$lib/types/result';
import { Ok, Err } from '$lib/types/result';

export async function loginUser(username: string, password: string): AsyncResult<string, string> {
  const fetchedUser = await usersDb
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (fetchedUser.length < 1) {
    Err(`'${username}' does not exist.`)
  }
  const user = fetchedUser[0];

  try {
    if (await argon2.verify(user.password, password)) {
      const jwtUser = {
        id: user.id,
        username: user.username,
      };

      const token = jwt.sign(jwtUser, env.JWT_SECRET_KEY!, {
        expiresIn: '1d',
      });

      return Ok(token);
    }
    return Err('Authentication failed.')
  } catch (_) {
    return Err('Authentication failed.')
  }
}

export async function hash(password: string): AsyncResult<string, string> {
  try {
    const hash = await argon2.hash(password);
    return Ok(hash)
  } catch (e) {
    console.log(e);
    return Err('argon2 hash failed.');
  }
}
