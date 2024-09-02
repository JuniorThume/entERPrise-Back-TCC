import { inject, injectable } from 'tsyringe';
import { ProductInfoRepository } from '../infra/repositories/ProductInfoRepository';
import { DeleteResult } from 'typeorm';
import NotFound from '../../../shared/errors/NotFound';

@injectable()
class DeleteProductInfoService {
  constructor(
    @inject('ProductInfoRepository')
    private productInfoRepository: ProductInfoRepository
  ) {}
  public async execute(info_id: number): Promise<DeleteResult> {
    const infoExists = await this.productInfoRepository.findById(info_id);

    if (!infoExists) {
      throw new NotFound('Informação não existe', {});
    }

    const infoDeleted = await this.productInfoRepository.delete(info_id);

    return infoDeleted;
  }
}

export { DeleteProductInfoService };
