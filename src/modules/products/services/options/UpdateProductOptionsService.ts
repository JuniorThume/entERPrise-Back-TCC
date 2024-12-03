import { inject, injectable } from 'tsyringe';
import { IProductOptionsRepository } from '../../domain/repositories/IProductOptionsRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { NotFound } from '../../../../shared/errors/NotFound';
import { BadRequest } from '../../../../shared/errors/BadRequest';
import { ProductOption } from '../../infra/models/ProductOptions';
import { IChanges } from '../../domain/models/IChanges';
import { InternalServerError } from '../../../../shared/errors/InternalServerError';

@injectable()
class UpdateProductOptionsService {
  constructor(
    @inject('ProductOptionsRepository')
    private productOptionsRepository: IProductOptionsRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}
  async execute(
    product_id: number,
    info_id: number,
    changes: IChanges
  ): Promise<ProductOption> {
    const productExists = await this.productRepository.findById(product_id);

    if (!productExists) {
      throw new NotFound('O produto nao existe');
    }

    const infoExists = await this.productOptionsRepository.findById(info_id);

    if (!infoExists) {
      throw new NotFound('A informação não existe');
    }

    const thereIsRelation =
      await this.productOptionsRepository.infoBelongToProduct(
        productExists,
        info_id
      );

    if (!thereIsRelation) {
      throw new BadRequest('Esta informação não pertence ao produto');
    }

    Object.assign(infoExists, changes);

    const updatedProduct =
      await this.productOptionsRepository.update(infoExists);

    if (!updatedProduct) {
      throw new InternalServerError(
        'Não foi possível atualizar a informação do produto'
      );
    }

    return updatedProduct;
  }
}

export { UpdateProductOptionsService };
