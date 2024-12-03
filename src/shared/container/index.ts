import 'reflect-metadata';
import { container } from 'tsyringe';
import { ProductRepository } from '../../modules/products/infra/repositories/ProductRepository';
import { IProductRepository } from '../../modules/products/domain/repositories/IProductRepository';
import { IProductOptionsRepository } from '../../modules/products/domain/repositories/IProductOptionsRepository';
import { ProductOptionsRepository } from '../../modules/products/infra/repositories/ProductOptionsRepository';
import { ICredentialRepository } from '../../modules/credentials/domain/repositories/ICredentialRepository';
import { CredentialRepository } from '../../modules/credentials/infra/repositories/CredentialRepository';
import { IPersonalDataRepository } from '../../modules/personal_data/domain/repositories/IPersonalDataRepository';
import { PersonalDataRepository } from '../../modules/personal_data/infra/repositories/PersonalDataRepository';
import { IEmployeeRepository } from '../../modules/employees/domain/repositories/IEmployeeRepository';
import { EmployeeRepository } from '../../modules/employees/infra/repositories/EmployeeRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IProductOptionsRepository>(
  'ProductOptionsRepository',
  ProductOptionsRepository
);

container.registerSingleton<IPersonalDataRepository>(
  'PersonalDataRepository',
  PersonalDataRepository
);

container.registerSingleton<ICredentialRepository>(
  'CredentialRepository',
  CredentialRepository
);

container.registerSingleton<IEmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository
);
