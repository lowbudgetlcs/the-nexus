import type { User } from "$lib/types/models";
import { Err, Ok, type AsyncResult } from "$lib/utils";
import { eq } from "drizzle-orm";
import { users } from "./db/users/schema";
import { usersDb } from "./db/users";

export async function readUserById(id: number): AsyncResult<User, string> {
  const res = await usersDb.select({ id: users.id, username: users.username, password: users.password }).from(users).where(eq(users.id, id));
  if (res.length === 0) {
    return Err('User does not exist.');
  }
  const user = res[0];
  return Ok(user);
}

export async function readUserByUsername(username: string): AsyncResult<User, string> {
  const res: User[] = await usersDb
    .select({ id: users.id, username: users.username, password: users.password })
    .from(users)
    .where(eq(users.username, username));

  if (res.length != 1) {
    return Err(`'${username}' does not exist.`);
  }
  return Ok(res[0]);
}
