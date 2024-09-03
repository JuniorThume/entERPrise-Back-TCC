import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ProductInfo } from '../../infra/models/ProductInfos';
import { Product } from '../../infra/models/Products';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import BadRequest from '../../../../shared/errors/BadRequest';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(
    product: Product,
    productInfo: ProductInfo
  ): Promise<Product | null> {
    const productExists = await this.productRepository.findByName(product.name);
    if (productExists?.length) {
      throw new BadRequest('Já existe um produto com este nome', product);
    }

    const newProduct = this.productRepository.insert(product, productInfo);

    return newProduct;
  }
}

export { CreateProductService };
