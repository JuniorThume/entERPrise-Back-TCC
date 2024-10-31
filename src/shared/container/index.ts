import 'reflect-metadata';
import { container } from 'tsyringe';
import { ProductRepository } from '../../modules/products/infra/repositories/ProductRepository';
import { IProductRepository } from '../../modules/products/domain/repositories/IProductRepository';
import { IProductInfoRepository } from '../../modules/products/domain/repositories/IProductInfoRepository';
import { ProductInfoRepository } from '../../modules/products/infra/repositories/ProductInfoRepository';
import { ICredentialRepository } from '../../modules/auth/domain/repositories/ICredentialRepository';
import { CredentialRepository } from '../../modules/auth/infra/repositories/CredentialRepository';
import { IPersonalDataRepository } from '../../modules/personal_data/domain/repositories/IPersonalDataRepository';
import { PersonalDataRepository } from '../../modules/personal_data/infra/repositories/PersonalDataRepository';
import { IEmployeeRepository } from '../../modules/employees/domain/repositories/IEmployeeRepository';
import { EmployeeRepository } from '../../modules/employees/infra/repositories/EmployeeRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IProductInfoRepository>(
  'ProductInfoRepository',
  ProductInfoRepository
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
