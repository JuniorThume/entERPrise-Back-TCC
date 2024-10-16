import 'reflect-metadata';
import { IFilterProduct } from '../../domain/models/IFilterProduct';
import { Product } from '../../infra/models/Products';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(filter: IFilterProduct): Promise<Product[] | null> {
    const products = await this.productRepository.findByFilter(filter);
    products?.forEach((product) => {
      product.image = product.image?.toString('base64');
    });
    return products;
  }
}

export { ListProductService };
