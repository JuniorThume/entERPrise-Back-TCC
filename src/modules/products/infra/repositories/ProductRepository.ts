import { Repository } from 'typeorm';
import { Product } from '../models/Products';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { IFilter } from '../../domain/models/IFilter';
import { ProductInfo } from '../models/ProductInfos';

export class ProductRepository implements IProductRepository {
  private ormProductRepository: Repository<Product>;
  private ormInfosRepository: Repository<ProductInfo>;
  constructor() {
    this.ormProductRepository = data_source.getRepository(Product);
    this.ormInfosRepository = data_source.getRepository(ProductInfo);
  }

  async insert(
    product: Product,
    product_info: ProductInfo
  ): Promise<Product | null> {
    const productCreated = await this.ormProductRepository.save(product);
    if (!productCreated) {
      return null;
    }
    product_info.product_id = productCreated;
    const infoProductCreated = await this.ormInfosRepository.save(product_info);
    if (!infoProductCreated) {
      return null;
    }

    return productCreated;
  }

  async update(product: Product): Promise<Product> {
    const productUpdated = await this.ormProductRepository.save(product);

    return productUpdated;
  }

  async delete(id: number): Promise<void> {
    await this.ormProductRepository.delete({ id: id });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.ormProductRepository.find();

    return products;
  }

  async findOneByFilter(filter: IFilter): Promise<Product | null> {
    const product = await this.ormProductRepository.findOne({ where: filter });

    return product;
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.ormProductRepository.findOne({
      where: { id: id }
    });

    return product;
  }

  async findByName(name: string): Promise<Product[] | null> {
    const product = await this.ormProductRepository.find({
      where: { name: name }
    });

    return product;
  }

  async findByDescription(description: string): Promise<Product[] | null> {
    console.log(description);
    return null;
  }
}
