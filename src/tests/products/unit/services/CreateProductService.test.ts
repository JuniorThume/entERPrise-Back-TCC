import { IProduct } from '../../../../modules/products/domain/models/IProduct';
import { Product } from '../../../../modules/products/infra/models/Products';
import { FakeProductRepository } from '../../../../modules/products/infra/repositories/fakes/FakeProductRepository';
import { CreateProductService } from '../../../../modules/products/services/products/CreateProductService';
import { BadRequest } from '../../../../shared/errors/BadRequest';

describe('CreateProductService', () => {
  let createProductService: CreateProductService;
  let product_test: IProduct;
  beforeAll(() => {
    const fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);

    product_test = {
      id: 90,
      brand: 'adsadsa',
      category: 'adsadsa',
      description: 'adsadsa',
      genre: 'adsadsa',
      image_url: 'adsadsa',
      material: 'adsadsa',
      name: 'Test Product'
    };
  });
  it('Deve criar um produto', async () => {
    const createdProduct = await createProductService.execute(
      product_test as Product
    );

    expect(createdProduct).toHaveProperty('id');
    expect(createdProduct?.name).toBe('Test Product');
  });

  it('Não deve permitir inserir dois produtos com o mesmo nome', async () => {
    const productData: IProduct = {
      id: 90,
      brand: 'adsadsa',
      category: 'adsadsa',
      description: 'adsadsa',
      genre: 'adsadsa',
      image_url: 'adsadsa',
      material: 'adsadsa',
      name: 'Test Product'
    };

    try {
      await createProductService.execute(productData as Product);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
      expect(err).toHaveProperty('message');
    }
  });
});
