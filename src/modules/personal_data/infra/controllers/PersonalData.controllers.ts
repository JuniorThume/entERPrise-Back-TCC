import 'reflect-metadata';
import { Request, Response } from 'express';
import { IPersonalData } from '../../domain/models/IPersonalData';
import { CreatePersonalDataService } from '../../services/CreatePersonalDataService';
import { container } from 'tsyringe';
import { status_code } from '../../../../shared/consts/statusCode';
import { instanceToInstance } from 'class-transformer';
import { DeletePersonalDataService } from '../../services/DeletePersonalDataService';
import { UpdatePersonalDataService } from '../../services/UpdatePersonalDataService';

class PersonalDataController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, phone, email } = request.body;
    const received_data: IPersonalData = {
      cpf,
      phone: phone ? phone : null,
      email
    };

    const createPersonalDataService = container.resolve(
      CreatePersonalDataService
    );

    const created_personal_data =
      await createPersonalDataService.execute(received_data);

    return response
      .status(status_code.CREATED)
      .json(instanceToInstance(created_personal_data));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { cpf, phone, email } = request.body;

    const received_data: IPersonalData = {
      id,
      cpf,
      phone: phone ? phone : null,
      email
    };

    const updatePersonalDataService = container.resolve(
      UpdatePersonalDataService
    );

    const updated_personal_data =
      await updatePersonalDataService.execute(received_data);

    return response
      .status(status_code.CREATED)
      .json(instanceToInstance(updated_personal_data));
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePersonalDataService = container.resolve(
      DeletePersonalDataService
    );

    await deletePersonalDataService.execute(Number(id));

    return response.status(status_code.NO_CONTENT).json();
  }
}

export { PersonalDataController };
