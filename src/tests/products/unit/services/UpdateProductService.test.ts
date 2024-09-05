import { Product } from '../../../../modules/products/infra/models/Products';
import { FakeProductRepository } from '../../../../modules/products/infra/repositories/fakes/FakeProductRepository';
import { UpdateProductService } from '../../../../modules/products/services/products/UpdateProductService';

describe('UpdateProductService', () => {
  const fakeProductRepository = new FakeProductRepository();
  const updateProductService = new UpdateProductService(fakeProductRepository);

  const product_test: Product = {
    id: 1,
    brand: 'Marca 1',
    category: 'Categoria',
    description: 'Descricao 1',
    genre: 'Feminino',
    image_url: 'https://avatars.githubusercontent.com/u/87200582?v=4',
    material: 'Material 1',
    name: 'Test Product 1',
    infos: []
  };

  const info_test = {
    id: 1,
    prize: 100,
    color: 'Cor 1',
    quantity: 12,
    size: 'Tamanho 1',
    product_id: product_test
  };
  it('Deve atualizar um produto', async () => {
    await fakeProductRepository.insert(product_test, info_test);

    const updates: Product = {
      id: product_test.id,
      name: 'Test Product 2',
      description: 'Teste 2',
      category: 'Teste 2',
      brand: 'Marca 2',
      genre: 'Masculino',
      material: 'Material 2',
      image_url: 'https://avatars.githubusercontent.com/u/87200582?v=4',
      infos: []
    };

    const product = await updateProductService.execute(
      product_test.id,
      updates
    );

    expect(product?.id).toBe(updates.id);
    expect(product?.name).toBe(updates.name);
  });
});
