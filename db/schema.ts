import { sql, relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const lists = sqliteTable('lists_table', {
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

export const items = sqliteTable('items_table', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  checked: integer('checked', { mode: 'boolean' }).notNull().default(false),
  listId: integer('list_id')
    .notNull()
    .references(() => lists.id, { onDelete: 'cascade' }),
});

export const listsRelations = relations(lists, ({ many }) => {
  return {
    items: many(items),
  };
});

export const itemsRelations = relations(items, ({ one }) => {
  return {
    list: one(lists, { fields: [items.listId], references: [lists.id] }),
  };
});
