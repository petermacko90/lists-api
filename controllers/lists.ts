import type { Request, Response } from 'express';
import { drizzle } from 'drizzle-orm/libsql';
import { listsTable } from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import type { ListCreateRequest, ListUpdateRequest } from '../models/models.ts';

const db = drizzle(process.env.DB_FILE_NAME!);

export async function getLists(_req: Request, res: Response) {
  const lists = await db.select().from(listsTable);
  res.send(lists);
}

export async function createList(req: ListCreateRequest, res: Response) {
  const list = await db
    .insert(listsTable)
    .values({ title: req.body.title })
    .returning();

  res.send(list[0]);
}

export async function updateList(req: ListUpdateRequest, res: Response) {
  const list = await db
    .update(listsTable)
    .set({ title: req.body.title })
    .where(eq(listsTable.id, req.body.id))
    .returning();

  res.send(list[0]);
}
