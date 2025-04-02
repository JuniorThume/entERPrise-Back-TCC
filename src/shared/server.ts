import 'reflect-metadata';
import { app } from './app';
import 'dotenv/config';
import { data_source } from './typeorm/dataSource';

data_source
  .initialize()
  .then(() => {
    const port = process.env.APP_PORT || 5000;
    app.listen(port);
    console.log(`Server is running on port ${port}!`);
  })
  .catch((err) => {
    console.log(err);
    console.error('Error initializing database connection.');
  });
