import { inject, injectable } from 'tsyringe';
import { ProductInfoRepository } from '../../infra/repositories/ProductOptionsRepository';
import { ProductRepository } from '../../infra/repositories/ProductRepository';
import { NotFound } from '../../../../shared/errors/NotFound';
import { ProductInfo } from '../../infra/models/ProductOptions';

@injectable()
class ShowProductInfoService {
  constructor(
    @inject('ProductInfoRepository')
    private productInfoRepository: ProductInfoRepository,
    @inject('ProductRepository')
    private productRepository: ProductRepository
  ) {}
  public async execute(
    product_id: number,
    id: number
  ): Promise<ProductInfo | null> {
    const productExists = await this.productRepository.findById(product_id);

    if (!productExists) {
      throw new NotFound('Nao foi possivel encontrar um produto com esse id');
    }
    const infoExists = await this.productInfoRepository.infoBelongToProduct(
      productExists,
      id
    );

    if (!infoExists) {
      throw new NotFound('Esta informação não existe');
    }

    const info = await this.productInfoRepository.findById(id);
    return info;
  }
}

export { ShowProductInfoService };
