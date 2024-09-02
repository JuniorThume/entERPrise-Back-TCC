import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IProductInfos } from '../../domain/models/IProductInfos';
import { IProductInfoRepository } from '../../domain/repositories/IProductInfoRepository';
import { ProductInfo } from '../models/ProductInfos';

class ProductInfoRepository implements IProductInfoRepository {
  private ormProductInfoRepository: Repository<ProductInfo>;
  constructor() {
    this.ormProductInfoRepository = data_source.getRepository(ProductInfo);
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
    const info = await this.ormProductInfoRepository.findOneBy({ id: id });

    return info;
  }

  async findBySize(size: string): Promise<ProductInfo[] | null> {
    const infos = await this.ormProductInfoRepository.findBy({ size: size });

    return infos;
  }

  async checkSize(size: string): Promise<boolean> {
    const hasSize = await this.ormProductInfoRepository.findOne({
      where: { size: size }
    });

    return hasSize ? true : false;
  }

  async findByFilter(options: FindManyOptions): Promise<ProductInfo[] | null> {
    const infos = await this.ormProductInfoRepository.find(options);
    return infos;
  }
}

export { ProductInfoRepository };
