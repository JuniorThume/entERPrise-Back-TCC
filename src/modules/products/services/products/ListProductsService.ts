import 'reflect-metadata';
import { IFilterProduct } from '../../domain/interfaces/models/IFilterProduct';
import { Product } from '../../infra/models/Products';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../domain/interfaces/repositories/IProductRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(filter: IFilterProduct): Promise<Product[] | null> {
    const products = await this.productRepository.findByFilter(filter);
    return products;
  }
}

export { ListProductService };
