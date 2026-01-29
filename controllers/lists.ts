import type { Request, Response } from 'express';
import type { ListsBody, ListType } from '../types/list.ts';
import { mockedState } from '../mocks/mocks.ts';

export function getLists(_req: Request, res: Response<ListsBody>) {
  res.send(mockedState);
}

export function createList(req: Request<{}, {}, ListType>, res: Response<ListsBody>) {
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

export function updateList(req: Request<{}, {}, ListType>, res: Response<ListsBody>) {
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
