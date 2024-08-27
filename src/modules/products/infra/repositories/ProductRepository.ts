import { Repository } from 'typeorm';
import { Product } from '../models/Products';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { IFilter } from '../../domain/models/IFilter';

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;
  constructor() {
    this.ormRepository = data_source.getRepository(Product);
  }

  async insert(product: Product): Promise<Product> {
    const productCreated = await this.ormRepository.save(product);

    return productCreated;
  }

  async update(product: Product): Promise<Product> {
    const productUpdated = await this.ormRepository.save(product);

    return productUpdated;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id: id });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  async findOneByFilter(filter: IFilter): Promise<Product | null> {
    const product = await this.ormRepository.findOne({ where: filter });

    return product;
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.ormRepository.findOne({
      where: { id: id }
    });

    return product;
  }

  async findByName(name: string): Promise<Product[] | null> {
    const product = await this.ormRepository.find({ where: { name: name } });

    return product;
  }

  async findByDescription(description: string): Promise<Product[] | null> {
    console.log(description);
    return null;
  }
}
