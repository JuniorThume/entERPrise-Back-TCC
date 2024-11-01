import { Router } from 'express';
import { ProductOptionsController } from '../controllers/ProductOptionsController';
import {
  create_options_product_validation,
  delete_product_options_validator,
  list_product_options_validator,
  show_product_options_validator,
  update_product_options_validator
} from '../validation/ProductOptionsValidation';

const router = Router();
const productoptionsController = new ProductOptionsController();

router.post(
  '/:product_id/optionss',
  create_options_product_validation,
  productoptionsController.insert
);

router.put(
  '/:product_id/optionss/:id',
  update_product_options_validator,
  productoptionsController.update
);
router.get(
  '/:product_id/optionss/:id',
  show_product_options_validator,
  productoptionsController.show
);

router.get(
  '/:product_id/optionss',
  list_product_options_validator,
  productoptionsController.list
);

router.delete(
  '/:product_id/optionss/:id',
  delete_product_options_validator,
  productoptionsController.delete
);

export default router;
