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
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
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
