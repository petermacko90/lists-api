export type ItemId = string;

export type ItemType = {
  id: ItemId;
  text: string;
  checked: boolean;
};

export type ItemsRecord = Record<ItemId, ItemType>;
