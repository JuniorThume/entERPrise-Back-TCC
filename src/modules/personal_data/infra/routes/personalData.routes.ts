import 'reflect-metadata';
import { Router } from 'express';
import { PersonalDataController } from '../controllers/PersonalData.controllers';
import {
  create_personal_data_validator,
  delete_personal_data_validator,
  update_personal_data_validator
} from '../validation/PersonalDataValidation';
const routes = Router();

const personalDataController = new PersonalDataController();

routes.post('/', create_personal_data_validator, personalDataController.create);
routes.put(
  '/:id',
  update_personal_data_validator,
  personalDataController.update
);
routes.delete(
  '/:id',
  delete_personal_data_validator,
  personalDataController.delete
);

export default routes;
