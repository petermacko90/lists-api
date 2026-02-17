import { eq } from 'drizzle-orm';
import { items } from '../db/schema.ts';
import type {
  ItemCreateRequest,
  ItemDeleteRequest,
  ItemResponse,
  ItemsGetRequest,
  ItemsResponse,
  ItemUpdateRequest,
} from '../models/items.ts';
import type { Response } from 'express';
import type { Database } from '../models/models.ts';

export async function getItems(
  req: ItemsGetRequest,
  res: ItemsResponse,
  db: Database,
) {
  const allItems = await db
    .select()
    .from(items)
    .where(eq(items.listId, req.params.listId));

  res.send(allItems);
}

export async function createItem(
  req: ItemCreateRequest,
  res: ItemResponse,
  db: Database,
) {
  const item = await db
    .insert(items)
    .values({ listId: req.body.listId, text: req.body.text })
    .returning();

  res.send(item[0]);
}

export async function updateItem(
  req: ItemUpdateRequest,
  res: ItemResponse,
  db: Database,
) {
  const item = await db
    .update(items)
    .set({ text: req.body.text, checked: req.body.checked })
    .where(eq(items.listId, req.body.listId))
    .returning();

  res.send(item[0]);
}

export async function deleteItem(
  req: ItemDeleteRequest,
  res: Response,
  db: Database,
) {
  await db.delete(items).where(eq(items.id, req.params.id));
  res.status(204).send();
}
