import { and, eq } from 'drizzle-orm';
import { items, lists } from '../db/schema.ts';
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
import type { Logger } from 'winston';
import {
  INTERNAL_SERVER_ERROR,
  ITEM_NOT_FOUND,
  LIST_NOT_FOUND,
} from '../messages/messages.ts';

export async function getItems(
  req: ItemsGetRequest,
  res: ItemsResponse,
  db: Database,
  logger: Logger,
) {
  try {
    const allItems = await db
      .select()
      .from(items)
      .where(eq(items.listId, req.params.listId));

    res.send(allItems);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: INTERNAL_SERVER_ERROR });
  }
}

export async function createItem(
  req: ItemCreateRequest,
  res: ItemResponse,
  db: Database,
  logger: Logger,
) {
  try {
    const list = await db
      .select()
      .from(lists)
      .where(eq(lists.id, req.body.listId));

    if (list.length === 0) {
      res.status(404).send({ error: LIST_NOT_FOUND });
      return;
    }

    const item = await db
      .insert(items)
      .values({ listId: req.body.listId, text: req.body.text })
      .returning();

    res.send(item[0]);
  } catch (err) {
    logger.log(err);
    res.status(500).send({ error: INTERNAL_SERVER_ERROR });
  }
}

export async function updateItem(
  req: ItemUpdateRequest,
  res: ItemResponse,
  db: Database,
  logger: Logger,
) {
  try {
    const item = await db
      .update(items)
      .set({ text: req.body.text, checked: req.body.checked })
      .where(and(eq(items.listId, req.body.listId), eq(items.id, req.body.id)))
      .returning();

    if (item.length === 0) {
      res.status(404).send({ error: ITEM_NOT_FOUND });
    } else {
      res.send(item[0]);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: INTERNAL_SERVER_ERROR });
  }
}

export async function deleteItem(
  req: ItemDeleteRequest,
  res: Response,
  db: Database,
  logger: Logger,
) {
  try {
    const item = await db
      .delete(items)
      .where(eq(items.id, req.params.id))
      .returning();

    if (item.length === 0) {
      res.status(404).send({ error: ITEM_NOT_FOUND });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: INTERNAL_SERVER_ERROR });
  }
}
