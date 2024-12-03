import 'reflect-metadata';
import { IFilterProduct } from '../../domain/models/IFilterProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { IProduct } from '../../domain/models/IProduct';
import { IPaginate } from '../../domain/models/IPaginate';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(
    filter: IFilterProduct,
    limit: number,
    page: number
  ): Promise<IPaginate> {
    const products = await this.productRepository.findByFilter(
      filter,
      limit,
      page
    );
    products.data?.forEach((product: IProduct) => {
      product.image = product.image?.toString('base64');
    });

    return products;
  }
}

export { ListProductService };
