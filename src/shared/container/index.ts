import 'reflect-metadata';
import { container } from 'tsyringe';
import { ProductRepository } from '../../modules/products/infra/repositories/ProductRepository';
import { IProductRepository } from '../../modules/products/domain/repositories/IProductRepository';
import { IProductInfoRepository } from '../../modules/products/domain/repositories/IProductInfoRepository';
import { ProductInfoRepository } from '../../modules/products/infra/repositories/ProductInfoRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IProductInfoRepository>(
  'ProductInfoRepository',
  ProductInfoRepository
);
