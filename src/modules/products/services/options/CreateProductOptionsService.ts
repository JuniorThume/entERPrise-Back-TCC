import { inject, injectable } from 'tsyringe';
import { ProductOption } from '../../infra/models/ProductOptions';
import { NotFound } from '../../../../shared/errors/NotFound';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { IProductOptionsRepository } from '../../domain/repositories/IProductOptionsRepository';
import { IProductOptions } from '../../domain/models/IProductOptions';
import { InternalServerError } from '../../../../shared/errors/InternalServerError';
import { ConflictError } from '../../../../shared/errors/ConflictError';

@injectable()
class CreateProductOptionsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('ProductOptionsRepository')
    private productOptionsRepository: IProductOptionsRepository
  ) {}
  async execute(
    product_id: number,
    product_option: ProductOption
  ): Promise<IProductOptions> {
    const product = await this.productRepository.findById(product_id);
    if (!product) {
      throw new NotFound('Produto não encontrado!');
    }

    const option_already_exists =
      await this.productOptionsRepository.findByFilter({
        where: {
          product_id: { id: product.id },
          size: product_option.size,
          color: product_option.color
        }
      });
    if (option_already_exists.length !== 0) {
      throw new ConflictError(
        'Produto ja possui essas informações cadastradas'
      );
    }

    product_option.product_id = product;

    const optionCreated =
      await this.productOptionsRepository.insert(product_option);

    if (!optionCreated) {
      throw new InternalServerError(
        'Não foi possível cadastrar novas informações sobre o produto'
      );
    }

    return optionCreated;
  }
}

export { CreateProductOptionsService };
