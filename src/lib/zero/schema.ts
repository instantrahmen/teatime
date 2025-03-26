import { createZeroSchema } from 'drizzle-zero';
import * as drizzleSchema from '../db/schema';
import { FileChartColumnIncreasingIcon } from '@lucide/svelte';
import { definePermissions, type Row } from '@rocicorp/zero';

// Convert to Zero schema
export const schema = createZeroSchema(drizzleSchema, {
	// All tables/columns must be defined, but can be set to false to exclude them from the Zero schema.
	// Column names match your Drizzle schema definitions
	tables: {
		user: {
			id: true,
			name: true,
			email: true,
			emailVerified: true,
			image: true,
			createdAt: true,
			updatedAt: true,
		},
		medications: {
			id: true,
			name: true,
		},
		account: {
			id: true,
			accountId: true,
			providerId: true,
			userId: true,
			accessToken: true,
			refreshToken: true,
			idToken: true,
			accessTokenExpiresAt: true,
			refreshTokenExpiresAt: true,
			scope: true,
			password: false,
			createdAt: true,
			updatedAt: true,
		},
		verification: false,
		session: false,
	},
});

// Define permissions with the inferred types from Drizzle
export type Schema = typeof schema;
export type User = Row<typeof schema.tables.user>;
export type Medication = Row<typeof schema.tables.medications>;
export type Account = Row<typeof schema.tables.account>;

// export const permissions = definePermissions<{}, Schema>(schema, () => {
//   // ...further permissions definitions
// });

// export const permissions = definePermissions<AuthData, Schema>(schema, () => {
//   const allowIfIssueCreator = (
//     authData: AuthData,
//     {cmp}: ExpressionBuilder<Schema, "issue">,
//   ) => cmp('creatorID', authData.sub);

//   return {
//     issue: {
//       row: {
//         delete: [allowIfIssueCreator],
//       },
//     },
//   } satisfies PermissionsConfig<AuthData, Schema>;
// });
