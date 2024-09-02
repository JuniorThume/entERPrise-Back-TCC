import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductInfoService } from '../../services/CreateProductInfoService';
import { status_code } from '../../../../shared/consts/statusCode';
import { DeleteProductInfoService } from '../../services/DeleteProductInfoService';

class ProductInfoController {
  public async insert(request: Request, response: Response): Promise<Response> {
    const product_id = Number(request.params.id);
    const infos = request.body;

    const createProductInfoService = container.resolve(
      CreateProductInfoService
    );
    const infoCreated = await createProductInfoService.execute(
      product_id,
      infos
    );

    return response.status(status_code.CREATED).json(infoCreated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const deleteProductInfoService = container.resolve(
      DeleteProductInfoService
    );

    await deleteProductInfoService.execute(Number(product_id), Number(id));

    return response.status(status_code.OK).json({});
  }
}

export { ProductInfoController };
