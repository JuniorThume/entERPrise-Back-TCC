import 'reflect-metadata';
import { container } from 'tsyringe';
import { ProductRepository } from '../../modules/products/infra/repositories/ProductRepository';
import { IProductRepository } from '../../modules/products/domain/repositories/IProductRepository';
import { IProductInfoRepository } from '../../modules/products/domain/repositories/IProductInfoRepository';
import { ProductInfoRepository } from '../../modules/products/infra/repositories/ProductInfoRepository';
import { ICredentialRepository } from '../../modules/auth/domain/repositories/ICredentialRepository';
import { CredentialRepository } from '../../modules/auth/infra/repositories/CredentialRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IProductInfoRepository>(
  'ProductInfoRepository',
  ProductInfoRepository
);

container.registerSingleton<ICredentialRepository>(
  'CredentialRepository',
  CredentialRepository
);
