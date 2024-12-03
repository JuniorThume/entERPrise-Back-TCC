import { inject, injectable } from 'tsyringe';
import { ProductOption } from '../../infra/models/ProductOptions';
import { NotFound } from '../../../../shared/errors/NotFound';
import { IProductOptionsRepository } from '../../domain/repositories/IProductOptionsRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

@injectable()
class ListProductOptionsService {
  constructor(
    @inject('ProductOptionsRepository')
    private productOptionsRepository: IProductOptionsRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(product_id: number): Promise<ProductOption[] | null> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new NotFound('Produto nao encontrado');
    }
    return product.options;
  }
}

export { ListProductOptionsService };
