import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { createList, getLists, updateList } from './controllers/lists.ts';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('app is working');
});

app.get('/lists', (req: Request, res: Response) => getLists(req, res));

app.post('/lists', (req: Request, res: Response) => createList(req, res));

app.put('/lists', (req: Request, res: Response) => updateList(req, res));

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
