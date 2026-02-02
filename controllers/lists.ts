import type { Request } from 'express';
import type { ListsRequest, ListsResponse } from '../types/list.ts';
import { mockedState } from '../mocks/mocks.ts';

export function getLists(_req: Request, res: ListsResponse) {
  res.send(mockedState);
}

export function createList(req: ListsRequest, res: ListsResponse) {
  const newList = req.body;

  res.send({
    ...mockedState,
    lists: {
      ...mockedState.lists,
      [newList.id]: {
        id: newList.id,
        title: newList.title,
        modified: newList.modified,
        itemsIds: newList.itemsIds,
      },
    },
  });
}

export function updateList(req: ListsRequest, res: ListsResponse) {
  const updatedList = req.body;

  res.send({
    ...mockedState,
    lists: {
      ...mockedState.lists,
      [updatedList.id]: {
        id: updatedList.id,
        title: updatedList.title,
        modified: updatedList.modified,
        itemsIds: updatedList.itemsIds,
      },
    },
  });
}
