import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { Product } from '../../infra/models/Products';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { NotFound } from '../../../../shared/errors/NotFound';
@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(id: number): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFound('Produto nao encontrado', {
        status: 'Nao foi possivel encontrar o produto preterido',
        id: id
      });
    }

    return product;
  }
}

export { ShowProductService };
