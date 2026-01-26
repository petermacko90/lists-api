import express, { type Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { createList, getLists, updateList } from './controllers/lists.ts';
import type { ListsBody } from './types/list.ts';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('app is working');
});

app.get('/lists', (req, res: Response<ListsBody>) => getLists(req, res));

app.post('/lists', (req, res: Response<ListsBody>) => createList(req, res));

app.put('/lists', (req, res: Response<ListsBody>) => updateList(req, res));

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
