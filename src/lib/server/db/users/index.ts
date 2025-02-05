import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/better-sqlite3';

if (!env.USERS_DB_PATH) throw Error('USERS_DB_PATH not set.');
export const usersDb = drizzle(env.USERS_DB_PATH);
