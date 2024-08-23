import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import { data_source } from './typeorm/dataSource';
const app = express();

// app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', async (req, res) => {
  const data = await data_source.query('SELECT * FROM products');
  console.log(req.method);
  console.log(req.body.name);
  return res.status(200).json({
    message: 'Start Route with TS-NODE-DEV',
    data: data
  });
});
app.use(routes);

export default app;
