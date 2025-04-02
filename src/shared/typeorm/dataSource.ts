import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from '../../modules/products/infra/models/Products';
import { ProductOption } from '../../modules/products/infra/models/ProductOptions';
import { Credential } from '../../modules/credentials/infra/models/Credentials';
import { CreateProducts1718830788772 } from './migrations/1718830788772-CreateProducts';
import { CreatePersonalData1730300041393 } from './migrations/1730300041393-CreatePersonalData';
import { CreateEmployees1730314035940 } from './migrations/1730314035940-CreateEmployees';
import { CreateCredential1730314378971 } from './migrations/1730314378971-CreateCredential';
import { PersonalData } from '../../modules/personal_data/infra/models/PersonalData';
import { Employee } from '../../modules/employees/infra/models/Employee';

export const data_source = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  database: process.env.POSTGRES_DB || 'postgres',
  entities: [Product, ProductOption, Credential, PersonalData, Employee],
  synchronize: false,
  migrations: [
    CreateProducts1718830788772,
    CreatePersonalData1730300041393,
    CreateEmployees1730314035940,
    CreateCredential1730314378971
  ],
  extra: {
    options: '-c timezone=America/Sao_Paulo'
  }
});
