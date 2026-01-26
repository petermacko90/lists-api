import type { ItemId, ItemsRecord } from './item.ts';

export type ListId = string;

export type ListType = {
  id: ListId;
  title: string;
  modified: Date;
  itemsIds: ItemId[];
};

export type ListsRecord = Record<ListId, ListType>;

export type ListsBody = {
  lists: ListsRecord;
  items: ItemsRecord;
};
