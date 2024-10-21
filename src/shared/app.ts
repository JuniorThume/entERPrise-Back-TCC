import 'reflect-metadata';
import 'express-async-errors';
import './container/index';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errors } from 'celebrate';
import HandleErrors from './errors/HandleErrors';
// import { middleware } from 'express-paginate';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);
app.use((request: Request, response: Response) => {
  return response.status(404).json({ message: 'resource not found' });
});

app.use(errors());
app.use(HandleErrors);

export { app };
