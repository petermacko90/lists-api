import type { Request, Response } from 'express';
import * as schema from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import type {
  ListCreateRequest,
  ListDeleteRequest,
  ListResponse,
  ListsResponse,
  ListUpdateRequest,
  ListWithItems,
} from '../models/lists.ts';
import type { Database } from '../models/models.ts';
import type { Logger } from 'winston';
import { INTERNAL_SERVER_ERROR, LIST_NOT_FOUND } from '../messages/messages.ts';

export async function getLists(
  _req: Request,
  res: ListsResponse,
  db: Database,
  logger: Logger,
) {
  try {
    const listsWithItems: ListWithItems[] = await db.query.lists.findMany({
      with: {
        items: { limit: 5 },
      },
    });

    res.send(listsWithItems);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: INTERNAL_SERVER_ERROR });
  }
}

export async function createList(
  req: ListCreateRequest,
  res: ListResponse,
  db: Database,
  logger: Logger,
) {
  try {
    const list = await db
      .insert(schema.lists)
      .values({ title: req.body.title })
      .returning();

    res.send(list[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: INTERNAL_SERVER_ERROR });
  }
}

export async function updateList(
  req: ListUpdateRequest,
  res: ListResponse,
  db: Database,
  logger: Logger,
) {
  try {
    const list = await db
      .update(schema.lists)
      .set({ title: req.body.title })
      .where(eq(schema.lists.id, req.body.id))
      .returning();

    if (list.length === 0) {
      res.status(404).send({ error: LIST_NOT_FOUND });
    } else {
      res.send(list[0]);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: INTERNAL_SERVER_ERROR });
  }
}

export async function deleteList(
  req: ListDeleteRequest,
  res: Response,
  db: Database,
  logger: Logger,
) {
  try {
    const list = await db
      .delete(schema.lists)
      .where(eq(schema.lists.id, req.params.id))
      .returning();

    if (list.length === 0) {
      res.status(404).send({ error: LIST_NOT_FOUND });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: INTERNAL_SERVER_ERROR });
  }
}
