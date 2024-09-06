import { celebrate, Joi, Segments } from 'celebrate';

export const create_info_product_validation = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      size: Joi.string().min(1).max(4).required(),
      quantity: Joi.number().positive().required(),
      color: Joi.string().min(2).required(),
      price: Joi.number().greater(0).required()
    })
    .unknown(false),
  [Segments.PARAMS]: Joi.object().unknown(false)
});

export const update_product_info_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        size: Joi.string().max(100).optional(),
        quantity: Joi.string().max(255).optional(),
        color: Joi.string().optional(),
        price: Joi.string().optional()
      })
      .unknown(false),
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
      product_id: Joi.number().required()
    }).unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const list_product_info_validator = celebrate({
  [Segments.QUERY]: Joi.object({
    size: Joi.string().optional(),
    quantity: Joi.number().optional(),
    color: Joi.string().optional(),
    price: Joi.number().optional()
  }).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false),
  [Segments.PARAMS]: {
    product_id: Joi.number().required()
  }
});

export const show_product_info_validator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
    product_id: Joi.number().required()
  },
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false)
});

export const delete_product_info_validator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
    product_id: Joi.number().required()
  },
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false)
});
