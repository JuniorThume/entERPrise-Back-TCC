import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import CredentialRouter from '@modules/credentials/infra/routes/credentials.routes';
import {
  create_employee_validator,
  delete_employee_validator,
  list_employee_validator,
  show_employee_validator,
  update_employee_validator
} from '../validation/employeeValidation';
const routes = Router();

const employeeController = new EmployeeController();

routes.use('/credentials', CredentialRouter);
routes.post('/', create_employee_validator, employeeController.create);
routes.get('/', list_employee_validator, employeeController.list);
routes.get('/:id', show_employee_validator, employeeController.show);
routes.put('/:id', update_employee_validator, employeeController.update);
routes.delete('/:id', delete_employee_validator, employeeController.delete);

export default routes;
