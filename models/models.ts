import type { InferSelectModel } from 'drizzle-orm';
import type { listsTable, itemsTable } from '../db/schema.ts';
import type { Request, Response } from 'express';

export type List = InferSelectModel<typeof listsTable>;
export type Item = InferSelectModel<typeof itemsTable>;

export type ListWithItems = List & { items: Item[] };

export type ListCreateRequestBody = Pick<List, 'title'>;
export type ListUpdateRequestBody = Pick<List, 'id' | 'title'>;

export type ListCreateRequest = Request<{}, {}, ListCreateRequestBody>;
export type ListUpdateRequest = Request<{}, {}, ListUpdateRequestBody>;

export type ListsResponse = Response<ListWithItems[]>;
