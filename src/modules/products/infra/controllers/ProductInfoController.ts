import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductInfoService } from '../../services/infos/CreateProductInfoService';
import { status_code } from '../../../../shared/consts/statusCode';
import { RemoveProductInfoService } from '../../services/infos/RemoveProductInfoService';
import { ShowProductInfoService } from '../../services/infos/ShowProductInfoService';
import { ListProductInfoService } from '../../services/infos/ListProductInfoService';
import { UpdateProductInfoService } from '../../services/infos/UpdateProductInfoService';

class ProductInfoController {
  public async insert(request: Request, response: Response): Promise<Response> {
    const product_id = Number(request.params.product_id);
    const infos = request.body;

    const createProductInfoService = container.resolve(
      CreateProductInfoService
    );
    const infoCreated = await createProductInfoService.execute(
      product_id,
      infos
    );

    return response.status(status_code.CREATED).json({
      id: infoCreated.id,
      quantity: infoCreated.quantity,
      size: infoCreated.size,
      color: infoCreated.color,
      prize: infoCreated.prize
    });
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const infoRepository = container.resolve(ListProductInfoService);
    const { product_id } = request.params;
    const infos = await infoRepository.execute(Number(product_id));

    return response.status(status_code.OK).json(infos);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const showProductInfoService = container.resolve(ShowProductInfoService);
    const info = await showProductInfoService.execute(
      Number(product_id),
      Number(id)
    );

    return response.status(status_code.OK).json(info);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const product_id = parseInt(request.params.product_id);
    const id = parseInt(request.params.id);
    const changes = request.body;

    const updateProductInfoService = container.resolve(
      UpdateProductInfoService
    );

    const infoUpdated = await updateProductInfoService.execute(
      product_id,
      id,
      changes
    );

    return response.status(status_code.CREATED).json(infoUpdated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const deleteProductInfoService = container.resolve(
      RemoveProductInfoService
    );

    await deleteProductInfoService.execute(Number(product_id), Number(id));

    return response.status(status_code.NO_CONTENT).json();
  }
}

export { ProductInfoController };
