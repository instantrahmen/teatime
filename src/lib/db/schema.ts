import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const medications = pgTable('medications', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export * from './auth-schema';
