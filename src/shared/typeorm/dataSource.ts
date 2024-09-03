import { DataSource } from 'typeorm';
import { CreateProducts1718830788772 } from './migrations/1718830788772-CreateProducts';
import { Product } from '../../modules/products/infra/models/Products';
import { ProductInfo } from '../../modules/products/infra/models/ProductInfos';

export const data_source = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
  entities: [Product, ProductInfo],
  synchronize: false,
  migrationsRun: true,
  migrations: [CreateProducts1718830788772]
});
