import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import {
  createList,
  deleteList,
  getLists,
  updateList,
} from './controllers/lists.ts';
import type {
  ItemCreateRequest,
  ItemDeleteRequest,
  ItemResponse,
  ItemsGetRequest,
  ItemsResponse,
  ItemUpdateRequest,
  ListCreateRequest,
  ListDeleteRequest,
  ListResponse,
  ListsResponse,
  ListUpdateRequest,
} from './models/models.ts';
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from './controllers/items.ts';

const listsPath = '/lists';
const itemsPath = '/items';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('app is working');
});

app.get(listsPath, async (req: Request, res: ListsResponse) => {
  getLists(req, res);
});

app.post(listsPath, async (req: ListCreateRequest, res: ListResponse) => {
  createList(req, res);
});

app.put(listsPath, async (req: ListUpdateRequest, res: ListResponse) => {
  updateList(req, res);
});

app.delete(
  `${listsPath}/:id`,
  async (req: ListDeleteRequest, res: Response) => {
    deleteList(req, res);
  },
);

app.get(
  `${itemsPath}/:listId`,
  async (req: ItemsGetRequest, res: ItemsResponse) => {
    getItems(req, res);
  },
);

app.post(itemsPath, async (req: ItemCreateRequest, res: ItemResponse) => {
  createItem(req, res);
});

app.put(itemsPath, async (req: ItemUpdateRequest, res: ItemResponse) => {
  updateItem(req, res);
});

app.delete(
  `${itemsPath}/:id`,
  async (req: ItemDeleteRequest, res: Response) => {
    deleteItem(req, res);
  },
);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
