import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 15,
});

export const lblcsDb = drizzle({ client: pool });
