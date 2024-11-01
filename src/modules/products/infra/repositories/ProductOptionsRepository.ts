import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IProductOptions } from '../../domain/models/IProductOptions';
import { IProductOptionsRepository } from '../../domain/repositories/IProductOptionsRepository';
import { ProductOption } from '../models/ProductOptions';
import { IFilterOption } from '../../domain/models/IFilterOption';
import { Product } from '../models/Products';

class ProductOptionsRepository implements IProductOptionsRepository {
  private ormProductOptionsRepository: Repository<ProductOption>;
  constructor() {
    this.ormProductOptionsRepository = data_source.getRepository(ProductOption);
  }

  async insert(product_info: IProductOptions): Promise<ProductOption | null> {
    const infoCreated =
      await this.ormProductOptionsRepository.save(product_info);
    console.log(infoCreated);
    return infoCreated;
  }

  async update(info: IProductOptions): Promise<ProductOption | null> {
    const infoUpdated = await this.ormProductOptionsRepository.save(info);

    return infoUpdated;
  }

  async delete(id: number): Promise<DeleteResult> {
    const info = await this.ormProductOptionsRepository.delete({
      id: id
    });
    return info;
  }

  async findById(id: number): Promise<ProductOption | null> {
    const info = await this.ormProductOptionsRepository.findOne({
      where: { id: id }
    });

    return info;
  }

  async findBySize(size: string): Promise<ProductOption[] | null> {
    const infos = await this.ormProductOptionsRepository.findBy({ size: size });

    return infos;
  }

  async findByProduct(
    product: Product,
    filter: IFilterOption
  ): Promise<ProductOption[] | null> {
    const options = Object.assign({}, filter, { product_id: product });

    const infos = await this.ormProductOptionsRepository.find({
      where: options
    });

    return infos;
  }

  async findByFilter(options: FindManyOptions): Promise<ProductOption[]> {
    const infos = await this.ormProductOptionsRepository.find(options);
    return infos;
  }

  async infoBelongToProduct(product: Product, id: number): Promise<boolean> {
    const info = await this.ormProductOptionsRepository.findOne({
      where: {
        id: id,
        product_id: product
      }
    });

    return info ? true : false;
  }
}

export { ProductOptionsRepository };
