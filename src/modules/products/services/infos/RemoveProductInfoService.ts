import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import { NotFound } from '../../../../shared/errors/NotFound';
import { IProductInfoRepository } from '../../domain/repositories/IProductInfoRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

@injectable()
class RemoveProductInfoService {
  constructor(
    @inject('ProductInfoRepository')
    private productInfoRepository: IProductInfoRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository
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
      throw new NotFound('Informação não existe no produto definido');
    }

    if (infoExists?.product_id !== productExists) {
      throw new NotFound('O produto e a informação não se relacionam');
    }

    const infoDeleted = await this.productInfoRepository.delete(info_id);

    return infoDeleted;
  }
}

export { RemoveProductInfoService };
