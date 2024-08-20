import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Start Route with TS-NODE-DEV'
  });
});

app.listen(process.env.APP_PORT);
