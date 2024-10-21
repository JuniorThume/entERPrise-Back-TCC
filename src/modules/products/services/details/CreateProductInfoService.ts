import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ProductInfo } from '../../infra/models/ProductInfos';
import { NotFound } from '../../../../shared/errors/NotFound';
import { BadRequest } from '../../../../shared/errors/BadRequest';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { IProductInfoRepository } from '../../domain/repositories/IProductInfoRepository';
import { IProductInfos } from '../../domain/models/IProductInfos';
import { InternalServerError } from '../../../../shared/errors/InternalServerError';

@injectable()
class CreateProductInfoService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('ProductInfoRepository')
    private productInfoRepository: IProductInfoRepository
  ) {}
  async execute(
    product_id: number,
    product_info: ProductInfo
  ): Promise<IProductInfos> {
    const product = await this.productRepository.findById(product_id);
    if (!product) {
      throw new NotFound('Nao foi possivel encontrar um produto com esse id');
    }
    const alreadyExists = await this.productInfoRepository.findByFilter({
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

    const infoCreated = await this.productInfoRepository.insert(product_info);

    if (!infoCreated) {
      throw new InternalServerError(
        'Não foi possível cadastrar novas informações sobre o produto'
      );
    }

    return infoCreated;
  }
}

export { CreateProductInfoService };
