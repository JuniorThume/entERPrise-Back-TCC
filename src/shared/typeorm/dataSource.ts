import { DataSource } from 'typeorm';
import { CreateProducts1718830788772 } from './migrations/1718830788772-CreateProducts';
import { Product } from '../../modules/products/infra/models/Products';
import { ProductInfo } from '../../modules/products/infra/models/ProductInfos';
import { Credential } from '../../modules/auth/infra/models/Credentials';
import { CreatePersonalData1730300041393 } from './migrations/1730300041393-CreatePersonalData';
import { CreateEmployees1730314035940 } from './migrations/1730314035940-CreateEmployees';
import { CreateCredential1730314378971 } from './migrations/1730314378971-CreateCredential';

export const data_source = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
  entities: [Product, ProductInfo, Credential],
  synchronize: false,
  migrations: [
    CreateProducts1718830788772,
    CreatePersonalData1730300041393,
    CreateEmployees1730314035940,
    CreateCredential1730314378971
  ]
});
