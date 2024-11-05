import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IProductOptions } from '../../domain/models/IProductOptions';
import { IProductOptionsRepository } from '../../domain/repositories/IProductOptionsRepository';
import { ProductOption } from '../models/ProductOptions';
import { IFilterOption } from '../../domain/models/IFilterOption';
import { Product } from '../models/Products';

class ProductOptionsRepository implements IProductOptionsRepository {
  private ormProductOptionsRepository: Repository<ProductOption>;
  private ormProductsRepository: Repository<Product>;
  constructor() {
    this.ormProductOptionsRepository = data_source.getRepository(ProductOption);
    this.ormProductsRepository = data_source.getRepository(Product);
  }

  async insert(product_info: IProductOptions): Promise<ProductOption | null> {
    const infoCreated =
      await this.ormProductOptionsRepository.save(product_info);
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
      where: { id: id },
      relations: ['product_id']
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
  ): Promise<Product | null> {
    const options = Object.assign({}, filter, { id: product.id });
    console.log(options);
    const infos = await this.ormProductsRepository.findOne({
      where: { options },
      relations: ['options']
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
