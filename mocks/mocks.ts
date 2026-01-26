import type { ListsBody } from '../types/list.ts';

const listId1 = '101';
const listId2 = '102';
const itemId1 = '201';
const itemId2 = '202';

export const mockedState: ListsBody = {
  lists: {
    [listId1]: {
      id: listId1,
      title: '',
      modified: new Date('2026-01-26T11:11:00Z'),
      itemsIds: [],
    },
    [listId2]: {
      id: listId2,
      title: 'Shopping List',
      modified: new Date('2026-01-26T11:12:00Z'),
      itemsIds: [itemId1, itemId2],
    },
  },
  items: {
    [itemId1]: {
      id: itemId1,
      text: 'Bread',
      checked: false,
    },
    [itemId2]: {
      id: itemId2,
      text: 'Butter',
      checked: true,
    },
  },
};
