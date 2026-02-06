import type { Request, Response } from 'express';
import { drizzle } from 'drizzle-orm/libsql';
import { listsTable } from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import type {
  ListCreateRequest,
  ListDeleteRequest,
  ListResponse,
  ListsResponse,
  ListUpdateRequest,
} from '../models/models.ts';

const db = drizzle(process.env.DB_FILE_NAME!);

export async function getLists(_req: Request, res: ListsResponse) {
  const lists = await db.select().from(listsTable);
  res.send(lists);
}

export async function createList(req: ListCreateRequest, res: ListResponse) {
  const list = await db
    .insert(listsTable)
    .values({ title: req.body.title })
    .returning();

  res.send(list[0]);
}

export async function updateList(req: ListUpdateRequest, res: ListResponse) {
  const list = await db
    .update(listsTable)
    .set({ title: req.body.title })
    .where(eq(listsTable.id, req.body.id))
    .returning();

  res.send(list[0]);
}

export async function deleteList(req: ListDeleteRequest, res: Response) {
  await db.delete(listsTable).where(eq(listsTable.id, req.params.id));
  res.status(204).send();
}
