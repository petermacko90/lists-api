import express from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (_req, res) => {
  res.send('app is working');
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
