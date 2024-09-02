import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IProductInfos } from '../../domain/models/IProductInfos';
import { IProductInfoRepository } from '../../domain/repositories/IProductInfoRepository';
import { ProductInfo } from '../models/ProductInfos';
import { Product } from '../models/Products';
import { IFilterInfo } from '../../domain/models/IFilterInfo';

class ProductInfoRepository implements IProductInfoRepository {
  private ormProductInfoRepository: Repository<ProductInfo>;
  private ormProductRepository: Repository<Product>;
  constructor() {
    this.ormProductInfoRepository = data_source.getRepository(ProductInfo);
    this.ormProductRepository = data_source.getRepository(Product);
  }

  async insert(product_info: IProductInfos): Promise<ProductInfo | null> {
    const infoCreated = await this.ormProductInfoRepository.save(product_info);

    return infoCreated;
  }

  async update(info: IProductInfos): Promise<ProductInfo | null> {
    const infoUpdated = await this.ormProductInfoRepository.save(info);

    return infoUpdated;
  }

  async delete(id: number): Promise<DeleteResult> {
    const info = await this.ormProductInfoRepository.delete({
      id: id
    });
    return info;
  }

  async findById(id: number): Promise<ProductInfo | null> {
    const info = await this.ormProductInfoRepository.findOne({
      where: { id: id }
    });

    return info;
  }

  async findBySize(size: string): Promise<ProductInfo[] | null> {
    const infos = await this.ormProductInfoRepository.findBy({ size: size });

    return infos;
  }

  async findByProduct(
    product: Product,
    filter: IFilterInfo
  ): Promise<ProductInfo[] | null> {
    const options = Object.assign({}, filter, { product_id: product });
    const infos = await this.ormProductInfoRepository.find({
      where: options
    });

    return infos;
  }

  async findByFilter(options: FindManyOptions): Promise<ProductInfo[] | null> {
    const infos = await this.ormProductInfoRepository.find(options);
    return infos;
  }

  async infoBelongToProduct(product: Product, id: number): Promise<boolean> {
    const info = await this.ormProductInfoRepository.findOne({
      where: {
        id: id,
        product_id: product
      }
    });

    return info ? true : false;
  }
}

export { ProductInfoRepository };
