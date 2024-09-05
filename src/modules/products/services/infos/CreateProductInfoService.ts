import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ProductInfo } from '../../infra/models/ProductInfos';
import { ProductRepository } from '../../infra/repositories/ProductRepository';
import { ProductInfoRepository } from '../../infra/repositories/ProductInfoRepository';
import { NotFound } from '../../../../shared/errors/NotFound';
import { AppError } from '../../../../shared/errors/AppError';
import { status_code } from '../../../../shared/consts/statusCode';
import { BadRequest } from '../../../../shared/errors/BadRequest';

@injectable()
class CreateProductInfoService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
    @inject('ProductInfoRepository')
    private productInfoRepository: ProductInfoRepository
  ) {}
  async execute(
    product_id: number,
    product_info: ProductInfo
  ): Promise<ProductInfo> {
    const product = await this.productRepository.findById(product_id);
    if (!product) {
      throw new NotFound('Nao foi possivel encontrar um produto com esse id', {
        resource: 'product',
        status: 'Not Found'
      });
    }
    const alreadyExists = await this.productInfoRepository.findByFilter({
      where: {
        product_id: product_id,
        size: product_info.size,
        color: product_info.color
      }
    });

    if (alreadyExists?.length) {
      throw new BadRequest(
        'Produto ja possui essas informações cadastradas',
        {}
      );
    }

    product_info.product_id = product;

    const infoCreated = await this.productInfoRepository.insert(product_info);

    if (!infoCreated) {
      throw new AppError(
        'Não foi possível cadastrar novas informações sobre o produto',
        status_code.INTERNAL_SERVER_ERROR
      );
    }

    return infoCreated;
  }
}

export { CreateProductInfoService };
