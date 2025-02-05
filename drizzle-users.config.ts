import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.USERS_DB_PATH) throw new Error('USERS_DB_PATH is not set');

export default defineConfig({
  out: './src/lib/server/db/users',
  dbCredentials: {
    url: process.env.USERS_DB_PATH,
  },
  dialect: 'sqlite',
});
