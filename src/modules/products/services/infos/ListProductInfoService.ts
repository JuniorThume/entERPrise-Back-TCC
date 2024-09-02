import { inject, injectable } from 'tsyringe';
import { ProductInfoRepository } from '../../infra/repositories/ProductInfoRepository';
import { ProductInfo } from '../../infra/models/ProductInfos';
import { ProductRepository } from '../../infra/repositories/ProductRepository';
import NotFound from '../../../../shared/errors/NotFound';

@injectable()
class ListProductInfoService {
  constructor(
    @inject('ProductInfoRepository')
    private productInfoRepository: ProductInfoRepository,
    @inject('ProductRepository')
    private productRepository: ProductRepository
  ) {}

  public async execute(product_id: number): Promise<ProductInfo[] | null> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new NotFound('Produto nao encontrado');
    }
    return await this.productInfoRepository.findByProduct(product, {});
  }
}

export { ListProductInfoService };
