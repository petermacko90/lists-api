import type { InferSelectModel } from 'drizzle-orm';
import type { Request, Response } from 'express';
import type { items } from '../db/schema.ts';
import type { ErrorResponse } from './models.ts';

export type Item = InferSelectModel<typeof items>;

export type ItemsGetRequestParams = Pick<Item, 'listId'>;
export type ItemCreateRequestBody = Pick<Item, 'listId' | 'text'>;
export type ItemUpdateRequestBody = Item;
export type ItemDeleteRequestParams = Pick<Item, 'id'>;

export type ItemsGetRequest = Request<ItemsGetRequestParams>;
export type ItemCreateRequest = Request<{}, {}, ItemCreateRequestBody>;
export type ItemUpdateRequest = Request<{}, {}, ItemUpdateRequestBody>;
export type ItemDeleteRequest = Request<ItemDeleteRequestParams>;

export type ItemResponse = Response<Item | ErrorResponse>;
export type ItemsResponse = Response<Item[] | ErrorResponse>;
