import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const listsTable = sqliteTable('lists_table', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const itemsTable = sqliteTable('items_table', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  checked: integer('checked', { mode: 'boolean' }).notNull().default(false),
  listId: integer('list_id')
    .notNull()
    .references(() => listsTable.id, { onDelete: 'cascade' }),
});
