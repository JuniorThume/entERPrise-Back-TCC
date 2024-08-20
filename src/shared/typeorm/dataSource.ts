import { DataSource } from 'typeorm';

export const data_source = new DataSource({
  type: 'mysql',
  host: '?',
  port: 2222,
  username: '?',
  password: '?',
  database: 'StokService',
  entities: [],
  migrations: []
});
