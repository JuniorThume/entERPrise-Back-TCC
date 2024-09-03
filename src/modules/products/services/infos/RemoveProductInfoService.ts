import { inject, injectable } from 'tsyringe';
import { ProductInfoRepository } from '../../infra/repositories/ProductInfoRepository';
import { DeleteResult } from 'typeorm';
import NotFound from '../../../../shared/errors/NotFound';
import { ProductRepository } from '../../infra/repositories/ProductRepository';

@injectable()
class RemoveProductInfoService {
  constructor(
    @inject('ProductInfoRepository')
    private productInfoRepository: ProductInfoRepository,
    @inject('ProductRepository')
    private productRepository: ProductRepository
  ) {}
  public async execute(
    product_id: number,
    info_id: number
  ): Promise<DeleteResult> {
    const productExists = await this.productRepository.findById(product_id);
    if (!productExists) {
      throw new NotFound('O produto nao existe');
    }

    const infoExists = await this.productInfoRepository.findById(info_id);

    if (!infoExists) {
      throw new NotFound('Informação não existe', {});
    }
    console.log(infoExists.product_id.id);

    if (infoExists.product_id.id !== productExists.id) {
      throw new NotFound('O produto e a informação não se relacionam', {});
    }

    const infoDeleted = await this.productInfoRepository.delete(info_id);

    return infoDeleted;
  }
}

export { RemoveProductInfoService };
