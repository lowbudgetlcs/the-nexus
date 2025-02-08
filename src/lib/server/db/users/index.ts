import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/better-sqlite3';

export const usersDb = drizzle(env.USERS_DB_PATH);
