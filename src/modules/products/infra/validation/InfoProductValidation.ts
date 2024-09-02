import { celebrate, Joi, Segments } from 'celebrate';

export const create_info_product_validation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    size: Joi.string().min(1).max(4).required(),
    quantity: Joi.number().positive().required(),
    color: Joi.string().min(2).required(),
    prize: Joi.number().positive().required()
  })
});
