import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errors } from 'celebrate';
import HandleErrors from './errors/HandleErrors';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  return res.status(200).json({
    message: 'Start Route with TS-NODE-DEV'
  });
});

app.use(routes);

app.use(HandleErrors);
app.use(errors());

export default app;
