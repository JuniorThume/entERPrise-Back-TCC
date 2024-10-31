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
import { IEmployee } from '../../domain/models/IEmployee';

class EmployeeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { role, personal_data_id } = request.body;
    const createEmployeeService = container.resolve(CreateEmployeeService);

    const created_employee = await createEmployeeService.execute(
      Number(personal_data_id),
      role
    );
    if (!created_employee) {
      throw new InternalServerError(
        'Algo ocorreu e não foi possível concluir o cadastro do funcionário'
      );
    }

    return response
      .status(status_code.CREATED)
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
    const employee_changes: IEmployee = {
      ...request.body
    };
    const updateEmployeeService = container.resolve(UpdateEmployeeService);

    await updateEmployeeService.execute(Number(id), employee_changes);

    return response.status(status_code.NO_CONTENT).json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEmployeeService = container.resolve(DeleteEmployeeService);

    await deleteEmployeeService.execute(Number(id));

    return response.status(status_code.NO_CONTENT).json();
  }
}

export { EmployeeController };
