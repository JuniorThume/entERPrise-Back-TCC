import { NextFunction, Request, Response } from 'express';
import CreateProductService from '../../services/CreateProductService';
import RemoveProductService from '../../services/RemoveProductService';
import ShowProductService from '../../services/ShowProductService';
import { AppError } from '../../../../shared/errors/AppError';
import ListProductService from '../../services/ListProductsService';

export class ProductController {
  public async insert(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const createProductService = new CreateProductService();
    const { product, product_info } = request.body;
    const productCreated = await createProductService.execute(
      product,
      product_info
    );
    // TODO Entender como o express-async-errors funciona

    if (!productCreated) {
      throw next(
        new AppError('Nao foi possivel criar o produto', 500, [
          {
            status: 'Um produto com este nome já existe no sistema',
            produto: product
          }
        ])
      );
    }
    return response.status(201).json(productCreated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeProductService = new RemoveProductService();
    await removeProductService.execute(Number(id));

    return response.status(204).json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showProductService = new ShowProductService();

    const product = await showProductService.execute({});

    return response.status(200).json(product);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();

    const products = await listProductService.execute();

    return response.status(200).json(products);
  }
}
