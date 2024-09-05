import 'reflect-metadata';
import 'express-async-errors';
import './container/index';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errors } from 'celebrate';
import HandleErrors from './errors/HandleErrors';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);
app.use((request: Request, response: Response, next: NextFunction) => { //eslint-disable-line
  return response.status(404).json({ message: 'page not found' });
});

app.use(errors());
app.use(HandleErrors);

export { app };
