import { Router } from 'express';
import { ProductInfoController } from '../controllers/ProductInfoController';
import { create_info_product_validation } from '../validation/InfoProductValidation';

const router = Router();
const productinfoController = new ProductInfoController();

router.post(
  '/:id/infos',
  create_info_product_validation,
  productinfoController.insert
);

export default router;
