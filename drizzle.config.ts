import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	out: './src/lib/server/db',
	dbCredentials: {
		url: process.env.DATABASE_URL
	},
	dialect: 'sqlite'
});
