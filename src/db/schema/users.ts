import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  userId: integer('user_id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  nickname: text('nickname').notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
