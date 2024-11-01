import { inject, injectable } from 'tsyringe';
import { NotFound } from '../../../../shared/errors/NotFound';
import { ProductOption } from '../../infra/models/ProductOptions';
import { IProductOptionsRepository } from '../../domain/repositories/IProductOptionsRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

@injectable()
class ShowProductOptionsService {
  constructor(
    @inject('ProductOptionsRepository')
    private productOptionsRepository: IProductOptionsRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}
  public async execute(
    product_id: number,
    id: number
  ): Promise<ProductOption | null> {
    const productExists = await this.productRepository.findById(product_id);

    if (!productExists) {
      throw new NotFound('Nao foi possivel encontrar um produto com esse id');
    }
    const infoExists = await this.productOptionsRepository.infoBelongToProduct(
      productExists,
      id
    );

    if (!infoExists) {
      throw new NotFound('Esta informação não existe');
    }

    const info = await this.productOptionsRepository.findById(id);
    return info;
  }
}

export { ShowProductOptionsService };
