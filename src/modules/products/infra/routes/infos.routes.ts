import { Router } from 'express';
import { ProductInfoController } from '../controllers/ProductInfoController';
import { create_info_product_validation } from '../validation/InfoProductValidation';

const router = Router();
const productinfoController = new ProductInfoController();

router.post(
  '/:product_id/infos',
  create_info_product_validation,
  productinfoController.insert
);

router.put('/:product_id/infos/:id', productinfoController.update);
router.get('/:product_id/infos/:id', productinfoController.show);

router.get('/:product_id/infos', productinfoController.list);

router.delete('/:product_id/infos/:id', productinfoController.delete);

export default router;
