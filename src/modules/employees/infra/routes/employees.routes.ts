import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
const routes = Router();

const employeeController = new EmployeeController();

routes.post('/', employeeController.create);
routes.get('/', employeeController.list);
routes.get('/:id', employeeController.show);
// routes.put('/:id', employeeController.update);
routes.delete('/:id', employeeController.delete);

export default routes;
