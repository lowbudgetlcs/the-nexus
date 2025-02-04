import { env } from '$env/dynamic/private';
import { drizzle as drizzleLite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = Database(env.DATABASE_URL!);
export const db = drizzleLite(sqlite);
