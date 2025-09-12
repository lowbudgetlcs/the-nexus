import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const client = new Database(env.USERS_DB_PATH);

export const db = drizzle(client, { schema });
