import { celebrate, Joi, Segments } from 'celebrate';

export const create_product_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string().max(100).required(),
        code: Joi.string().length(8).required(),
        description: Joi.string().max(255).optional().allow(null, ''),
        category: Joi.string().required(),
        brand: Joi.string().required(),
        material: Joi.string().required(),
        genre: Joi.string()
          .allow('Infantil', 'Masculino', 'Feminino', 'Unissex')
          .required(),
        image: Joi.any().optional()
      })
      .unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false),
    [Segments.PARAMS]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const update_product_validator = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string().max(100).optional(),
        description: Joi.string().max(255).optional().allow(''),
        category: Joi.string().optional(),
        brand: Joi.string().optional(),
        material: Joi.string().optional(),
        genre: Joi.string()
          .allow('Infantil', 'Masculino', 'Feminino', 'Unissex')
          .optional(),
        image: Joi.any().optional().allow('')
      })
      .unknown(false),
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }).unknown(false),
    [Segments.QUERY]: Joi.object({}).unknown(false)
  },
  { abortEarly: false }
);

export const list_product_validator = celebrate({
  [Segments.QUERY]: Joi.object({
    name: Joi.string().max(100).optional(),
    category: Joi.string().optional(),
    brand: Joi.string().optional(),
    material: Joi.string().optional(),
    genre: Joi.string().optional(),
    page: Joi.number().optional(),
    limit: Joi.number().optional()
  }).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false),
  [Segments.PARAMS]: Joi.object({}).unknown(false)
});

export const show_product_validator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  },
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false)
});

export const delete_product_validator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  },
  [Segments.QUERY]: Joi.object({}).unknown(false),
  [Segments.BODY]: Joi.object({}).unknown(false)
});
