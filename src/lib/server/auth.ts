import argon2 from 'argon2';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import { type AsyncResult, Ok, Err, Success } from '$lib/utils';
import { readUserById, readUserByUsername } from './users';
import type { SessionUser } from '$lib/types/models';

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
  try {
    console.log(user.password);
    console.log(password);
    if (await argon2.verify(user.password, password)) {
      console.log("Authenticated.")
      const jwtUser = {
        id: user.id,
        username: user.username,
      };

      const token = jwt.sign(jwtUser, env.JWT_SECRET_KEY!, {
        expiresIn: '1d',
      });
      console.log('Signed.')

      return Ok(token);
    }
    return Err('Authentication failed.');
  } catch (e) {
    console.error(e);
    return Err('Authentication failed.');
  }
}

export async function hash(password: string): AsyncResult<string, string> {
  try {
    const hash = await argon2.hash(password);
    return Ok(hash);
  } catch (e) {
    console.log(e);
    return Err('argon2 hash failed.');
  }
}
