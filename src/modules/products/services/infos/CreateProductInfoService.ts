import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ProductInfo } from '../../infra/models/ProductInfos';
import { NotFound } from '../../../../shared/errors/NotFound';
import { AppError } from '../../../../shared/errors/AppError';
import { status_code } from '../../../../shared/consts/statusCode';
import { BadRequest } from '../../../../shared/errors/BadRequest';
import { IProductRepository } from '../../domain/interfaces/repositories/IProductRepository';
import { IProductInfoRepository } from '../../domain/interfaces/repositories/IProductInfoRepository';
import { IProductInfos } from '../../domain/interfaces/models/IProductInfos';

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
      throw new AppError(
        'Não foi possível cadastrar novas informações sobre o produto',
        status_code.INTERNAL_SERVER_ERROR
      );
    }

    return infoCreated;
  }
}

export { CreateProductInfoService };
