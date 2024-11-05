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
    option_id: number
  ): Promise<DeleteResult> {
    const product_exists = await this.productRepository.findById(product_id);
    if (!product_exists) {
      throw new NotFound('Produto não encontrado');
    }

    const option_exists =
      await this.productOptionsRepository.findById(option_id);

    if (!option_exists) {
      throw new NotFound('A opção não existe no produto definido');
    }
    console.log(product_exists);
    console.log(option_exists);

    if (option_exists?.product_id.id !== product_exists.id) {
      throw new NotFound('O produto e a informação não se relacionam');
    }

    const optionDeleted = await this.productOptionsRepository.delete(option_id);

    return optionDeleted;
  }
}

export { RemoveProductOptionsService };
