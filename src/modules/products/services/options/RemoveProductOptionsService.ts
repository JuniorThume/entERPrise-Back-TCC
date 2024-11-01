import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import { NotFound } from '../../../../shared/errors/NotFound';
import { IProductOptionsRepository } from '../../domain/repositories/IProductOptionsRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

@injectable()
class RemoveProductOptionsService {
  constructor(
    @inject('ProductOptionsRepository')
    private productOptionsRepository: IProductOptionsRepository,
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

    const infoExists = await this.productOptionsRepository.findById(info_id);

    if (!infoExists) {
      throw new NotFound('Optionsrmação não existe no produto definido');
    }

    if (infoExists?.product_id !== productExists) {
      throw new NotFound('O produto e a informação não se relacionam');
    }

    const infoDeleted = await this.productOptionsRepository.delete(info_id);

    return infoDeleted;
  }
}

export { RemoveProductOptionsService };
