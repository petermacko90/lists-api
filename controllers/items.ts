import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { itemsTable } from '../db/schema.ts';
import type {
  ItemCreateRequest,
  ItemDeleteRequest,
  ItemResponse,
  ItemsGetRequest,
  ItemsResponse,
  ItemUpdateRequest,
} from '../models/models.ts';
import type { Response } from 'express';

const db = drizzle(process.env.DB_FILE_NAME!);

export async function getItems(req: ItemsGetRequest, res: ItemsResponse) {
  const items = await db
    .select()
    .from(itemsTable)
    .where(eq(itemsTable.listId, req.params.listId));

  res.send(items);
}

export async function createItem(req: ItemCreateRequest, res: ItemResponse) {
  const item = await db
    .insert(itemsTable)
    .values({ listId: req.body.listId, text: req.body.text })
    .returning();

  res.send(item[0]);
}

export async function updateItem(req: ItemUpdateRequest, res: ItemResponse) {
  const item = await db
    .update(itemsTable)
    .set({ text: req.body.text, checked: req.body.checked })
    .where(eq(itemsTable.listId, req.body.listId))
    .returning();

  res.send(item[0]);
}

export async function deleteItem(req: ItemDeleteRequest, res: Response) {
  await db.delete(itemsTable).where(eq(itemsTable.id, req.params.id));
  res.status(204).send();
}
