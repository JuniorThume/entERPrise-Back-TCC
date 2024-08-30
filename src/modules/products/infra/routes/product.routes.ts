import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import {
  create_product_validator,
  delete_product_validator,
  show_product_validator,
  update_product_validator
} from '../validation/CreateProductValidation';
import infosRouter from './infos.routes';
const router = Router();
const productsController = new ProductController();

router.post('/', create_product_validator, productsController.insert);
router.put('/:id', update_product_validator, productsController.update);
router.get('/', productsController.list);
router.get('/:id', show_product_validator, productsController.show);
router.delete('/:id', delete_product_validator, productsController.delete);

router.use('/:id/infos', infosRouter);

export default router;
