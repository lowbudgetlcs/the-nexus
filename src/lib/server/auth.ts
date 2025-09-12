import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { env } from '$env/dynamic/private';
import { type AsyncResult, Ok, Err, Success } from '$lib/result';
import { readUserById, readUserByUsername, type SessionUser } from '$lib/server/db/users';


export const authenticate = async (token: string): Promise<SessionUser | null> => {
  try {
    // Verify JWT and fetch user from db
    const jwtUser = jwt.verify(token, env.JWT_SECRET_KEY);
    if (typeof jwtUser === 'string') {
      return null;
    }
    const res = await readUserById(jwtUser.id);
    if (!Success(res)) return null;
    const user = res.unwrap();
    const sessionUser = {
      id: user.id,
      username: user.username,
    };
    return sessionUser;
  } catch (error) {
    console.error(error);
    return null;
  }

}

export async function login(username: string, password: string): AsyncResult<string, string> {
  const res = await readUserByUsername(username);
  if (!Success(res)) return res;
  const user = res.unwrap();
  const pepper = env.PASSWORD_PEPPER;
  try {
    if (await argon2.verify(user.password, password, { secret: Buffer.from(pepper) })) {
      const jwtUser = {
        id: user.id,
        username: user.username,
      };

      const token = jwt.sign(jwtUser, env.JWT_SECRET_KEY!, {
        expiresIn: '1d',
      });

      return Ok(token);
    }
    return Err('Authentication failed.');
  } catch (e) {
    console.error(e);
    return Err('Authentication failed.');
  }
}

export async function hash(password: string): AsyncResult<string, string> {
  const pepper = env.PASSWORD_PEPPER;
  try {
    const hash = await argon2.hash(password, { secret: Buffer.from(pepper) });
    return Ok(hash);
  } catch (e) {
    console.log(e);
    return Err('argon2 hash failed.');
  }
}
