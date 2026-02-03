import express, { type Request } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { drizzle } from 'drizzle-orm/libsql';
import { createList, getLists, updateList } from './controllers/lists.ts';
import type { ListsRequest, ListsResponse } from './types/list.ts';

const db = drizzle(process.env.DB_FILE_NAME!);

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('app is working');
});

app.get('/lists', (req: Request, res: ListsResponse) => getLists(req, res));

app.post('/lists', (req: ListsRequest, res: ListsResponse) =>
  createList(req, res),
);

app.put('/lists', (req: ListsRequest, res: ListsResponse) =>
  updateList(req, res),
);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
