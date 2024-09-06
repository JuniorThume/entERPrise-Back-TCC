import { Product } from '../../../../modules/products/infra/models/Products';
import { FakeProductRepository } from '../../../../modules/products/infra/repositories/fakes/FakeProductRepository';
import { ShowProductService } from '../../../../modules/products/services/products/ShowProductService';
import { NotFound } from '../../../../shared/errors/NotFound';

describe('ShowProductService', () => {
  const fakeProductRepository = new FakeProductRepository();
  const showProductService = new ShowProductService(fakeProductRepository);
  const product1: Product = {
    id: 1,
    name: 'Test Product 1',
    description: 'Test Description',
    category: 'Test Category',
    material: 'Test Material',
    genre: 'Test Gender',
    brand: 'Test Brand',
    image_url: 'Test Image URL',
    infos: []
  };

  it('Deve trazer um produto especifico por id', async () => {
    fakeProductRepository.insert(product1);
    const product = await showProductService.execute(1);

    expect(product?.id).toBe(1);
  });

  it('Não deve retornar um produto', async () => {
    try {
      await showProductService.execute(199);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFound);
      expect(err).toHaveProperty('message');
    }
  });
});
