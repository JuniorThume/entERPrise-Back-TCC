import { container } from 'tsyringe';
import { ProductRepository } from '../../modules/products/infra/repositories/ProductRepository';
import { IProductRepository } from '../../modules/products/domain/repositories/IProductRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);
