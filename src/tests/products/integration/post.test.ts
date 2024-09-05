import request from 'supertest';
import { app } from '../../../shared/app';
import { data_source } from '../../../shared/typeorm/dataSource';

describe('POST /products', () => {
  beforeAll(async () => {
    await data_source.initialize();
  });

  afterAll(async () => {
    await data_source.destroy();
  });
  it('Deve criar um produtos', async () => {
    const data = {
      product: {
        name: 'Blusa',
        description: 'Baita blusa',
        category: 'Bermuda',
        brand: 'Vclouthing',
        material: 'lã',
        genre: 'Masculino'
      },
      product_info: {
        size: 'M',
        quantity: 12,
        color: 'Vermelho',
        prize: 20.8
      }
    };

    const response = await request(app).post('/api/v1/products').send(data);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve listar todos os produtos', async () => {
    const products = await request(app).get('/api/v1/products');

    expect(products.body).toBeInstanceOf(Array);
    if (products.body.length > 0) {
      expect(products.body[0]).toHaveProperty('id');
    }
  });

  // it('Deve listar um produto em específico', async () => {
  //   console.log((await request(app).get('/api/v1/products')).body);
  // });

  // it('Deve listar todos os produtos', async () => {
  //   console.log((await request(app).get('/api/v1/products')).body);
  // });

  // it('Deve listar todos os produtos', async () => {
  //   console.log((await request(app).get('/api/v1/products')).body);
  // });

  // it('Deve listar todos os produtos', async () => {
  //   console.log((await request(app).get('/api/v1/products')).body);
  // });
});
