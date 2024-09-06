import { Router } from 'express';
import { ProductInfoController } from '../controllers/ProductInfoController';
import {
  create_info_product_validation,
  delete_product_info_validator,
  list_product_info_validator,
  show_product_info_validator,
  update_product_info_validator
} from '../validation/InfoProductValidation';

const router = Router();
const productinfoController = new ProductInfoController();

router.post(
  '/:product_id/infos',
  create_info_product_validation,
  productinfoController.insert
);

router.put(
  '/:product_id/infos/:id',
  update_product_info_validator,
  productinfoController.update
);
router.get(
  '/:product_id/infos/:id',
  show_product_info_validator,
  productinfoController.show
);

router.get(
  '/:product_id/infos',
  list_product_info_validator,
  productinfoController.list
);

router.delete(
  '/:product_id/infos/:id',
  delete_product_info_validator,
  productinfoController.delete
);

export default router;
