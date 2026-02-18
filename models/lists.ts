import type { InferSelectModel } from 'drizzle-orm';
import type { lists } from '../db/schema.ts';
import type { Request, Response } from 'express';
import type { ErrorResponse } from './models.ts';
import type { Item } from './items.ts';

export type List = InferSelectModel<typeof lists>;
export type ListWithItems = List & {
  items: Item[];
};

export type ListCreateRequestBody = Pick<List, 'title'>;
export type ListUpdateRequestBody = Pick<List, 'id' | 'title'>;
export type ListDeleteRequestParams = Pick<List, 'id'>;

export type ListCreateRequest = Request<{}, {}, ListCreateRequestBody>;
export type ListUpdateRequest = Request<{}, {}, ListUpdateRequestBody>;
export type ListDeleteRequest = Request<ListDeleteRequestParams>;

export type ListResponse = Response<List | ErrorResponse>;
export type ListsResponse = Response<List[] | ErrorResponse>;
