import type { InferSelectModel } from 'drizzle-orm';
import type { lists, items } from '../db/schema.ts';
import type { Request, Response } from 'express';

export type List = InferSelectModel<typeof lists>;
export type Item = InferSelectModel<typeof items>;

export type ListWithItems = List & {
  items: Item[];
};

export type ListCreateRequestBody = Pick<List, 'title'>;
export type ListUpdateRequestBody = Pick<List, 'id' | 'title'>;
export type ListDeleteRequestParams = Pick<List, 'id'>;

export type ListCreateRequest = Request<{}, {}, ListCreateRequestBody>;
export type ListUpdateRequest = Request<{}, {}, ListUpdateRequestBody>;
export type ListDeleteRequest = Request<ListDeleteRequestParams>;

export type ListResponse = Response<List>;
export type ListsResponse = Response<List[]>;

export type ItemsGetRequestParams = Pick<Item, 'listId'>;
export type ItemCreateRequestBody = Pick<Item, 'listId' | 'text'>;
export type ItemUpdateRequestBody = Pick<Item, 'listId' | 'text' | 'checked'>;
export type ItemDeleteRequestParams = Pick<Item, 'id'>;

export type ItemsGetRequest = Request<ItemsGetRequestParams>;
export type ItemCreateRequest = Request<{}, {}, ItemCreateRequestBody>;
export type ItemUpdateRequest = Request<{}, {}, ItemUpdateRequestBody>;
export type ItemDeleteRequest = Request<ItemDeleteRequestParams>;

export type ItemResponse = Response<Item>;
export type ItemsResponse = Response<Item[]>;
