import { Err, Ok, type AsyncResult } from '$lib/result';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { users } from './schema';

export type User = {
  id: number;
  username: string;
  password: string;
};

export async function readUserById(id: number): AsyncResult<User, string> {
  const res = await db
    .select({ id: users.id, username: users.username, password: users.password })
    .from(users)
    .where(eq(users.id, id));

  if (res.length === 0) {
    return Err('User does not exist.');
  }
  const user = res[0];
  return Ok(user);
}

export async function readUserByUsername(username: string): AsyncResult<User, string> {
  const res: User[] = await db
    .select({ id: users.id, username: users.username, password: users.password })
    .from(users)
    .where(eq(users.username, username));

  if (res.length != 1) {
    return Err(`'${username}' does not exist.`);
  }
  return Ok(res[0]);
}
