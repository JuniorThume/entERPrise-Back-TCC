import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import {
  create_product_validator,
  delete_product_validator,
  list_product_validator,
  show_product_validator,
  update_product_validator
} from '../validation/ProductValidation';
import infosRouter from './infos.routes';
const router = Router();
const productsController = new ProductController();

router.post('/', create_product_validator, productsController.insert);
router.put('/:id', update_product_validator, productsController.update);
router.get('/', list_product_validator, productsController.list);
router.get('/:id', show_product_validator, productsController.show);
router.delete('/:id', delete_product_validator, productsController.delete);

router.use(infosRouter);

export default router;
