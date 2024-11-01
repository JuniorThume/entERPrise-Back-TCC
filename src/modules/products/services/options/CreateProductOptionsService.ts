import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ProductOption } from '../../infra/models/ProductOptions';
import { NotFound } from '../../../../shared/errors/NotFound';
import { BadRequest } from '../../../../shared/errors/BadRequest';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { IProductOptionsRepository } from '../../domain/repositories/IProductOptionsRepository';
import { IProductOptions } from '../../domain/models/IProductOptions';
import { InternalServerError } from '../../../../shared/errors/InternalServerError';

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
    product_info: ProductOption
  ): Promise<IProductOptions> {
    const product = await this.productRepository.findById(product_id);
    if (!product) {
      throw new NotFound('Nao foi possivel encontrar um produto com esse id');
    }
    const alreadyExists = await this.productOptionsRepository.findByFilter({
      where: {
        product_id: product,
        size: product_info.size,
        color: product_info.color
      },
      relations: undefined
    });
    if (alreadyExists.length !== 0) {
      throw new BadRequest('Produto ja possui essas informações cadastradas');
    }

    product_info.product_id = product;

    const infoCreated =
      await this.productOptionsRepository.insert(product_info);

    if (!infoCreated) {
      throw new InternalServerError(
        'Não foi possível cadastrar novas informações sobre o produto'
      );
    }

    return infoCreated;
  }
}

export { CreateProductOptionsService };
