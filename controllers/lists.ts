import type { Request, Response } from 'express';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import type {
  ListCreateRequest,
  ListDeleteRequest,
  ListResponse,
  ListsResponse,
  ListUpdateRequest,
  ListWithItems,
} from '../models/models.ts';

const db = drizzle(process.env.DB_FILE_NAME!, { schema });

export async function getLists(_req: Request, res: ListsResponse) {
  const listsWithItems: ListWithItems[] = await db.query.lists.findMany({
    with: {
      items: {},
    },
  });

  res.send(listsWithItems);
}

export async function createList(req: ListCreateRequest, res: ListResponse) {
  const list = await db
    .insert(schema.lists)
    .values({ title: req.body.title })
    .returning();

  res.send(list[0]);
}

export async function updateList(req: ListUpdateRequest, res: ListResponse) {
  const list = await db
    .update(schema.lists)
    .set({ title: req.body.title })
    .where(eq(schema.lists.id, req.body.id))
    .returning();

  res.send(list[0]);
}

export async function deleteList(req: ListDeleteRequest, res: Response) {
  await db.delete(schema.lists).where(eq(schema.lists.id, req.params.id));
  res.status(204).send();
}
