import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/db/index.server';
import { twoFactor, bearer } from 'better-auth/plugins';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg', // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true,
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Cache duration in seconds
		},
	},
	plugins: [twoFactor(), bearer()],
});
