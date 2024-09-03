import 'reflect-metadata';
import app from './app';
import 'dotenv/config';
import { data_source } from './typeorm/dataSource';

data_source.initialize().then(() => {
  app.listen(process.env.APP_PORT || 3000);
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
