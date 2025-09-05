import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.USERS_DB_PATH) throw new Error('USERS_DB_PATH is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: { url: process.env.USERS_DB_PATH },
	verbose: true,
	strict: true
});
