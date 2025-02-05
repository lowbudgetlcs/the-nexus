import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/node-postgres';
if (!env.DATABASE_URL) throw Error('DATABASE_URL not set.');
export const lblcsDb = drizzle(env.DATABASE_URL);
