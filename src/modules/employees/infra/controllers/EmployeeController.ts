import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateEmployeeService } from '../../services/CreateEmployeeService';
import { status_code } from '../../../../shared/consts/statusCode';
import { instanceToInstance } from 'class-transformer';
import { InternalServerError } from '../../../../shared/errors/InternalServerError';
import { DeleteEmployeeService } from '../../services/DeleteEmployeeService';
import { ListEmployeeService } from '../../services/ListEmloyeeService';
import { ShowEmployeeService } from '../../services/ShowEmployeeService';
import { UpdateEmployeeService } from '../../services/UpdateEmployeeService';

class EmployeeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { role, name } = request.body;
    const createEmployeeService = container.resolve(CreateEmployeeService);

    const created_employee = await createEmployeeService.execute(role, name);
    if (!created_employee) {
      throw new InternalServerError(
        'Algo ocorreu e não foi possível concluir o cadastro do funcionário'
      );
    }

    return response
      .status(status_code.CREATED)
      .setHeader('Content-Type', 'application/json')
      .json(instanceToInstance(created_employee));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEmployeeService = container.resolve(ShowEmployeeService);

    const employee = await showEmployeeService.execute(Number(id));

    return response.status(status_code.OK).json(instanceToInstance(employee));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listEmployeeService = container.resolve(ListEmployeeService);

    const employees = await listEmployeeService.execute();

    return response.status(status_code.OK).json(instanceToInstance(employees));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateEmployeeService = container.resolve(UpdateEmployeeService);

    const updated_employee = await updateEmployeeService.execute(
      Number(id),
      request.body
    );
    return response.status(status_code.CREATED).json(updated_employee);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEmployeeService = container.resolve(DeleteEmployeeService);

    await deleteEmployeeService.execute(Number(id));

    return response.status(status_code.NO_CONTENT).json();
  }
}

export { EmployeeController };
