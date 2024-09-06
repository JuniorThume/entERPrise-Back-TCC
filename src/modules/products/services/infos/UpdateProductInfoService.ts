import { inject, injectable } from 'tsyringe';
import { IProductInfoRepository } from '../../domain/repositories/IProductInfoRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { NotFound } from '../../../../shared/errors/NotFound';
import { AppError } from '../../../../shared/errors/AppError';
import { BadRequest } from '../../../../shared/errors/BadRequest';
import { ProductInfo } from '../../infra/models/ProductInfos';
import { IChanges } from '../../domain/models/IChanges';

@injectable()
class UpdateProductInfoService {
  constructor(
    @inject('ProductInfoRepository')
    private productInfoRepository: IProductInfoRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}
  async execute(
    product_id: number,
    info_id: number,
    changes: IChanges
  ): Promise<ProductInfo> {
    const productExists = await this.productRepository.findById(product_id);

    if (!productExists) {
      throw new NotFound('O produto nao existe');
    }

    const infoExists = await this.productInfoRepository.findById(info_id);

    if (!infoExists) {
      throw new NotFound('A informação não existe');
    }

    const thereIsRelation =
      await this.productInfoRepository.infoBelongToProduct(
        productExists,
        info_id
      );

    if (!thereIsRelation) {
      throw new BadRequest('Esta informação não pertence ao produto');
    }

    Object.assign(infoExists, changes);

    const updatedProduct = await this.productInfoRepository.update(infoExists);

    if (!updatedProduct) {
      throw new AppError(
        'Não foi possível atualizar a informação do produto',
        500
      );
    }

    return updatedProduct;
  }
}

export { UpdateProductInfoService };
