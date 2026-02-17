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
} from './models/items.ts';
import type {
  ListCreateRequest,
  ListDeleteRequest,
  ListResponse,
  ListsResponse,
  ListUpdateRequest,
} from './models/lists.ts';
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from './controllers/items.ts';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './db/schema.ts';
import { createLogger, format, transports } from 'winston';

const listsPath = '/lists';
const itemsPath = '/items';

const app = express();
const port = process.env.PORT ?? 3000;

const db = drizzle(process.env.DB_FILE_NAME!, { schema });

const logger = createLogger({
  level: 'info',
  format: format.prettyPrint(),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console(),
  ],
});

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('app is working');
});

app.get(listsPath, async (req: Request, res: ListsResponse) => {
  getLists(req, res, db, logger);
});

app.post(listsPath, async (req: ListCreateRequest, res: ListResponse) => {
  createList(req, res, db, logger);
});

app.put(listsPath, async (req: ListUpdateRequest, res: ListResponse) => {
  updateList(req, res, db);
});

app.delete(
  `${listsPath}/:id`,
  async (req: ListDeleteRequest, res: Response) => {
    deleteList(req, res, db);
  },
);

app.get(
  `${itemsPath}/:listId`,
  async (req: ItemsGetRequest, res: ItemsResponse) => {
    getItems(req, res, db);
  },
);

app.post(itemsPath, async (req: ItemCreateRequest, res: ItemResponse) => {
  createItem(req, res, db);
});

app.put(itemsPath, async (req: ItemUpdateRequest, res: ItemResponse) => {
  updateItem(req, res, db);
});

app.delete(
  `${itemsPath}/:id`,
  async (req: ItemDeleteRequest, res: Response) => {
    deleteItem(req, res, db);
  },
);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
