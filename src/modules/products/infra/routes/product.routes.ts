import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import {
  create_product_validator
  // delete_product_validator
} from '../validation/CreateProductValidation';
import infosRouter from './infos.routes';
const router = Router();
const productsController = new ProductController();

router.post('/', create_product_validator, productsController.insert);
// router.delete('/', delete_product_validator, productsController.delete);
router.get('/', productsController.list);
// router.get('/:id', productsController.show);

router.use('/:id/infos', infosRouter);

export default router;
